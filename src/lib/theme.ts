// theme.ts
"use client";
import { createTheme } from "@mui/material/styles";
import { Cormorant, Italianno } from "next/font/google";

// Fuente para "Cherry on the Top" (Script/Manuscrita)
export const scriptFont = Italianno({
  weight: "400", // El único peso disponible para Italianno
  subsets: ["latin"],
  variable: "--font-script", // Una variable CSS fácil de usar
});

// Fuente para "SHE IS THE" y detalles (Serif Limpia)
export const serifFont = Cormorant({
  weight: ["300", "400", "500"], // Importa varios pesos para flexibilidad
  subsets: ["latin"],
  variable: "--font-serif", // Una variable CSS fácil de usar
});

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
