import styles from "./page.module.css";
import "./globals.css";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import { PINK_SECONDARY_COLOR } from "constants/colors";
import { helloBeautyFont } from "@/styles/fonts";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Card
        variant="outlined"
        sx={{
          width: {
            xs: "90%",
            md: "700px",
          },
        }}
      >
        <CardContent>
          <Stack justifyContent="center" alignItems="center" p={4}>
            <SentimentDissatisfied
              sx={{
                fontSize: 128,
                color: PINK_SECONDARY_COLOR,
              }}
            />
            <Typography
              variant="h3"
              mb={6}
              textAlign="center"
              sx={{
                fontFamily: `${helloBeautyFont.style.fontFamily} !important`,
              }}
            >
              Página no encontrada
            </Typography>
            <Typography variant="h6" textAlign="center">
              Parece que el enlace que seguiste es inválido o la invitación ha
              expirado. Por favor, verifica el enlace o solicita una nueva
              invitación.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
