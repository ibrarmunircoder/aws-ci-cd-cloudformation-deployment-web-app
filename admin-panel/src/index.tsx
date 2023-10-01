import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors } from "utils";
import { checkboxClasses } from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        colorPrimary: {
          color: colors.lightMediumGray,
          [`&.${checkboxClasses.checked}`]: {
            color: colors.lightRed,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ["Figtree", "sans-serif"].join(","),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
