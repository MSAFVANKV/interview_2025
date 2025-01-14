import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          zIndex: 11002, // Globally set z-index
        },
      },
    },
  },
});

export default function ThemProviderMui({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
