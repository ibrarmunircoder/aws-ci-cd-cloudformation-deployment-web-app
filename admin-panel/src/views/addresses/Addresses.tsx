import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  gridRowCountSelector,
  gridPageSizeSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useAddressPagination } from "views/addresses/hooks";
import {
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  DownloadIcon,
  InputField,
  SearchIcon,
} from "components";
import { StyledDataGrid } from "views/addresses/addresses.styles";
import { colors } from "utils";
import { SelectField } from "components/select-field/SelectField";
import { OrderEnum } from "enums";
import { useAuthContext } from "context";
import { useSidebar } from "hooks";
import { SelectChangeEvent } from "@mui/material/Select";

const outlinedButtonStyled = {
  color: colors.lightRed,
  marginBottom: "8px",
  "&.MuiButton-outlined": {
    border: `1px solid ${colors.lightRed} !important`,
  },
  "&:hover": {
    background: "transparent",
  },
};

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const pageCount = Math.ceil(rowCount / pageSize);

  const handlePageSize = async (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => {
    const pageSize = event.target.value as string;
    // @ts-expect-error
    apiRef.current.setPageSize(pageSize);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      marginTop="2px"
      alignItems="center"
      gap={{ xs: "10px", md: "30px" }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={{ xs: "10px", md: "30px" }}
      >
        <Typography
          sx={{ display: { xs: "none", sm: "block" }, fontSize: "13px" }}
        >
          Rows Per Page: {pageSize}
        </Typography>
        <SelectField
          value={pageSize}
          variant="standard"
          size="small"
          onChange={handlePageSize}
          sx={{
            minWidth: "80px !important",
          }}
        >
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="50">50</MenuItem>
          <MenuItem value="100">100</MenuItem>
          <MenuItem value="ALL">ALL</MenuItem>
        </SelectField>
      </Box>
      <Pagination
        color="primary"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
        sx={{
          "& .MuiPaginationItem-root": {
            color: colors.mediumDarkGray,
            "&.Mui-selected": {
              background: "transparent",
              color: colors.lightRed,
            },
            "&.Mui-selected:hover": {
              background: "transparent",
            },
          },
        }}
      />
    </Box>
  );
}

export const Addresses = () => {
  const {
    nameOrder,
    dateOrder,
    isLoading,
    rowCount,
    rows,
    setPaginationModel,
    paginationModel,
    columns,
    onSortChange,
    onFilterChange,
    handleSearchTerm,
    onRowSelectionModelChange,
    handleBulkDownload,
    handleOrderByDate,
    handleOrderByName,
  } = useAddressPagination();
  const { logoutUser } = useAuthContext();
  const sidebarStore = useSidebar();

  return (
    <Box
      sx={{
        background: colors.gray,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "1200px",
          maxWidth: "100%",
          boxShadow: "0px 4px 100px rgba(18, 29, 71, 0.04)",
          borderRadius: "40px",
          padding: "50px 70px",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              marginBottom="13px"
              gap="10px"
            >
              <Button
                variant="outlined"
                sx={outlinedButtonStyled}
                onClick={sidebarStore.onOpen}
              >
                Generate Iframe
              </Button>
              <Button
                variant="outlined"
                sx={outlinedButtonStyled}
                onClick={logoutUser}
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <InputField
                sx={{
                  width: { xs: "260px" },
                }}
                placeholder="Search by #"
                id="search-term"
                variant="outlined"
                onChange={handleSearchTerm}
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      sx={{
                        color: colors.mediumDarkGray,
                      }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              display="flex"
              justifyContent={{
                xs: "flex-start",
                md: "flex-start",
                lg: "space-between",
              }}
              flexWrap={{ xs: "wrap", lg: "nowrap" }}
              alignItems="flex-start"
              gap="20px"
            >
              <SelectField
                onChange={handleOrderByName}
                sx={{
                  width: { xs: "200px" },
                }}
                fullWidth
                value={nameOrder || ""}
                label="Select"
                variant="outlined"
              >
                <MenuItem value={OrderEnum.ASC}>From A to Z</MenuItem>
                <MenuItem value={OrderEnum.DESC}>From Z to A</MenuItem>
              </SelectField>
              <SelectField
                onChange={handleOrderByDate}
                fullWidth
                value={dateOrder || ""}
                label="Select"
                variant="outlined"
                sx={{
                  width: { xs: "200px" },
                }}
              >
                <MenuItem value={OrderEnum.DESC}>Latest</MenuItem>
                <MenuItem value={OrderEnum.ASC}>Oldest</MenuItem>
              </SelectField>
              <Button
                onClick={handleBulkDownload}
                sx={{
                  minWidth: "190px",
                  background: colors.lightRed,
                  color: colors.colorWhite,
                  padding: "16px 34px",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "24px",
                  outline: "none",
                  border: "none",
                  "&.Mui-disabled,&.Mui-disabled:hover ": {
                    background: colors.lightMediumGray,
                    pointerEvents: "all",
                    cursor: "progress",
                  },

                  "&:hover": {
                    background: colors.lightRed,
                    border: "none",
                  },
                  "& svg": {
                    "& path": {
                      stroke: colors.colorWhite,
                    },
                    marginRight: "8px",
                  },
                }}
                disabled={isLoading}
                variant="outlined"
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </Grid>
          </Grid>
          <div style={{ height: 500, width: "100%" }}>
            <StyledDataGrid
              getRowId={(row) => row.id}
              checkboxSelection
              rows={rows}
              rowCount={rowCount}
              loading={isLoading}
              columns={columns}
              pageSizeOptions={[10, 30, 100]}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              getRowHeight={() => "auto"}
              filterMode="server"
              sortingMode="server"
              onSortModelChange={onSortChange}
              onFilterModelChange={onFilterChange}
              onRowSelectionModelChange={onRowSelectionModelChange}
              slots={{
                columnSortedAscendingIcon: ColumnSortedAscendingIcon,
                columnSortedDescendingIcon: ColumnSortedDescendingIcon,
                pagination: CustomPagination,
                noRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    No Addresse Found!
                  </Stack>
                ),
              }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "table-even"
                  : "table-odd"
              }
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};
