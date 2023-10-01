import { Address } from 'interfaces';
import { useState, useEffect, useCallback } from 'react';
import {
  GridColDef,
  GridFilterItem,
  GridRenderCellParams,
  GridSortModel,
  GridFilterModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { useAxios, useDebounce, useToast } from 'hooks';
import { downloadExcel, getSortOrder, transformError } from 'helpers';
import { AddressQuery } from 'views/addresses/interfaces';
import { OrderEnum } from 'enums';
import { DownloadIcon } from 'components';
import { colors } from 'utils';
import { SelectChangeEvent } from '@mui/material/Select';
import { changeAddressFieldsName } from '../utils';
const dayjs = require('dayjs');

interface IPageInfo {
  rows: Address[];
  rowCount: number;
}

const columns: GridColDef[] = [
  {
    field: 'trackingNumber',
    headerName: 'Tracking #',
    sortable: true,
    disableColumnMenu: true,
    width: 210,
    filterable: false,
    headerClassName: 'table-header',
  },
  {
    headerName: 'Name',
    field: 'firstName',
    disableColumnMenu: true,
    width: 150,
    filterable: false,
    headerClassName: 'table-header',
    renderCell(params) {
      return `${params.row.firstName} ${params.row.lastName.split('-')[0]}`;
    },
  },
  {
    headerName: 'Email',
    field: 'email',
    disableColumnMenu: true,
    width: 220,
    filterable: false,
    headerClassName: 'table-header',
  },
  {
    headerName: 'Date',
    field: 'createdAt',
    cellClassName: 'break',
    disableColumnMenu: true,
    width: 135,
    filterable: false,
    headerClassName: 'table-header',
    renderCell(params) {
      return dayjs(params.row.createdAt).format('MMM DD, YYYY');
    },
  },
  {
    headerName: 'Address Line 1',
    field: 'addressLine1',
    disableColumnMenu: true,
    width: 160,
    headerClassName: 'table-header',
    filterable: false,
    sortable: false,
  },
  {
    headerName: 'City',
    disableColumnMenu: true,
    field: 'city',
    width: 80,
    headerClassName: 'table-header',
    filterable: false,
    sortable: false,
  },
  {
    headerName: 'State',
    disableColumnMenu: true,
    field: 'state',
    cellClassName: 'cell-center',
    width: 80,
    headerClassName: 'table-header',
    filterable: false,
    sortable: false,
  },
  {
    headerName: 'ZIP',
    disableColumnMenu: true,
    field: 'zipcode',
    width: 75,
    headerClassName: 'table-header',
    filterable: false,
    sortable: false,
  },
  {
    headerName: 'Download',
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    headerClassName: 'table-header',
    cellClassName: 'cell-center',
    field: 'base64PDF',
    renderCell: (params: GridRenderCellParams<Address>) => {
      return (
        <DownloadIcon
          onClick={(event) => {
            event.stopPropagation();
            downloadExcel(
              [changeAddressFieldsName(params.row)],
              `${params.row.firstName}-${params.row.lastName}.xlsx`
            );
          }}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              '& svg path': {
                stroke: colors.lightRed,
              },
            },
          }}
        />
      );
    },
    width: 110,
  },
];

export const useAddressPagination = () => {
  const toast = useToast();
  const AxiosClient = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 400);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    rows: [],
    rowCount: 0,
  });
  const [selectedRowData, setSelectedRowData] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nameOrder, setNameOrder] = useState<OrderEnum | null>(null);
  const [dateOrder, setDateOrder] = useState<OrderEnum | null>(OrderEnum.DESC);
  const [benefitBrand, setBenefitBrand] = useState<any>(null);

  const fetchBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosClient.get('brands', {
        params: {
          filter: {
            name: { equalTo: 'Benefit' },
          },
        },
      });
      const brands = data[0];
      setBenefitBrand(brands[0]);
    } catch (error) {
      toast.error(
        transformError(error).message ||
          'Sorry, We could not find benefit brand data.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [AxiosClient, toast]);

  const fetchAddresses = useCallback(
    async (query: AddressQuery) => {
      try {
        const result = await AxiosClient.get<[Address[], number]>('addresses', {
          params: query,
        });
        setPageInfo({
          rows: result.data[0],
          rowCount: result.data[1],
        });
      } catch (err) {
        toast.dismiss();
        toast.error(transformError(err).message);
      } finally {
        setIsLoading(false);
      }
    },
    [toast, AxiosClient]
  );

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    if (benefitBrand) {
      fetchAddresses({
        // @ts-expect-error
        ...(paginationModel.pageSize === 'ALL'
          ? {}
          : {
              limit: paginationModel.pageSize,
              offset: paginationModel.page * paginationModel.pageSize,
            }),
        filter: {
          recycleDonate: { isNull: 'null' },
          brandId: { valueIn: [benefitBrand.id] },
        },
        ...(debouncedValue ? { search: debouncedValue } : {}),
        ...(nameOrder
          ? { order: { sort: 'firstName', order: getSortOrder(nameOrder) } }
          : {}),
        ...(dateOrder
          ? { order: { sort: 'createdAt', order: getSortOrder(dateOrder) } }
          : {}),
      });
    }
  }, [
    fetchAddresses,
    benefitBrand,
    paginationModel,
    toast,
    debouncedValue,
    nameOrder,
    dateOrder,
  ]);

  const handleSearchTerm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();
      setSearchTerm(event.target.value);
    },
    []
  );

  const onSortChange = useCallback(
    async (sortModel: GridSortModel) => {
      if (sortModel.length === 0) return;
      const fieldItem = sortModel[0];
      await fetchAddresses({
        // @ts-expect-error
        ...(paginationModel.pageSize === 'ALL'
          ? {}
          : {
              limit: paginationModel.pageSize,
              offset: paginationModel.page * paginationModel.pageSize,
            }),
        order: {
          order: fieldItem.sort === 'asc' ? OrderEnum.ASC : OrderEnum.DESC,
          sort: fieldItem.field,
        },
      });
    },
    [fetchAddresses, paginationModel]
  );

  const onFilterChange = useCallback(
    async (filterModel: GridFilterModel) => {
      const { items } = filterModel;
      if (items.length) {
        const filter =
          items.every((item) => item.value) &&
          items.reduce((obj: any, item: GridFilterItem) => {
            obj[item.field] = { like: `${item.value}%` };
            return obj;
          }, {});
        await fetchAddresses({
          limit: paginationModel.pageSize,
          offset: paginationModel.page * paginationModel.pageSize,
          ...(filter ? { filter } : {}),
        });
      }
    },
    [paginationModel, fetchAddresses]
  );

  const onRowSelectionModelChange = (ids: GridRowSelectionModel) => {
    const selectedIDs = new Set(ids);
    const selectedRowData = pageInfo.rows.filter((row) =>
      selectedIDs.has(row.id)
    );
    setSelectedRowData(selectedRowData);
  };

  const handleBulkDownload = (event: React.FormEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (selectedRowData.length) {
      setIsLoading(true);
      const transformData = selectedRowData.map((row) =>
        changeAddressFieldsName(row)
      );
      downloadExcel(transformData, `addresses.xlsx`);
      setIsLoading(false);
    }
  };

  const handleOrderByName = async (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => {
    const nameOrder = event.target.value as string;
    const order = getSortOrder(nameOrder);
    setNameOrder(order);
    setDateOrder(null);
  };
  const handleOrderByDate = async (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => {
    const nameOrder = event.target.value as string;
    const order = getSortOrder(nameOrder);
    setDateOrder(order);
    setNameOrder(null);
  };

  return {
    isLoading,
    setPaginationModel,
    paginationModel,
    ...pageInfo,
    columns,
    onSortChange,
    onFilterChange,
    handleSearchTerm,
    onRowSelectionModelChange,
    handleBulkDownload,
    handleOrderByDate,
    handleOrderByName,
    dateOrder,
    nameOrder,
  };
};
