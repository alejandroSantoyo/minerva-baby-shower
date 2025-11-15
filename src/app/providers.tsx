"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "lib/theme";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log(
      "%c¡Hey! \n👋Pinche viej@ metiche, que buscas aquí?? 🤫",
      "font-size: 48px; font-weight: 900; color: #E91E63; text-shadow: 3px 3px 0 #000;"
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
