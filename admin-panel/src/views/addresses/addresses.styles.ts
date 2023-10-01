import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "utils";

export const StyledDataGrid = styled(DataGrid)((theme) => ({
  border: 0,
  "& > .MuiDataGrid-main": {
    "&>.MuiDataGrid-columnHeaders": {
      borderBottom: "none",
    },

    "& div div div div > .MuiDataGrid-cell": {
      borderBottom: "none",
    },
  },
  "& .MuiDataGrid-cell": {
    wordWrap: "break-word !important",
    whiteSpace: "normal !important",
    padding: "10px",
  },
  "& .MuiDataGrid-sortIcon": {
    color: "white",
  },
  "& .MuiDataGrid-menuIconButton": {
    color: "white",
  },

  "& .MuiDataGrid-iconButtonContainer": {
    visibility: "visible !important",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    width: "15px",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
    background: colors.colorWhite,
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
    backgroundColor: colors.gray,
    borderRadius: "10px",
  },
  "& .MuiDataGrid-footerContainer": {
    display: "flex",
    justifyContent: "center",
    border: "none",
  },
}));
