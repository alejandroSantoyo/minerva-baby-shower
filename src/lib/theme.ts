// theme.ts
"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: ["var(--font-serif)", "Roboto", "sans-serif"].join(","),
  },
  //   palette: {
  //     primary: {
  //       main: "#1976d2", // consider switching this into the custom colors
  //     },
  //   },
});

export default theme;
