"use client";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import styles from "@/styles/landing.module.css";
import { helloBeautyFont } from "@/styles/fonts";

interface InvitationProps {
  guest: string;
}

const IMAGE_FULL_WIDTH = 548;
const IMAGE_FULL_HEIGHT = 377;

export default function Invitation({ guest }: Readonly<InvitationProps>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const width = isMobile ? IMAGE_FULL_WIDTH * 0.7 : IMAGE_FULL_WIDTH;
  const height = isMobile ? IMAGE_FULL_HEIGHT * 0.7 : IMAGE_FULL_HEIGHT;

  return (
    <Box className={styles.invitation} p={1}>
      <Stack
        alignContent="center"
        justifyContent="center"
        alignItems="center"
        m={1}
      >
        <Typography variant="h5">SHE IS THE</Typography>
        <Typography
          variant="h2"
          mb={2}
          sx={{
            color: "#800000",
            fontFamily: `${helloBeautyFont.style.fontFamily} !important`,
          }}
        >
          Cherry on Top
        </Typography>
        <Image
          src={"/cherry-removebg-preview.png"}
          alt="baby-image"
          width={width}
          height={height}
        />
        <Typography variant="h5" mt={10} mb={2} fontWeight={"bold"}>
          ¡Hola, {guest}!
        </Typography>
        <Typography variant="h6" mb={2} textAlign="center">
          Únete a nosotros para celebrar el baby shower de
        </Typography>
        <Typography variant="h2">Minerva</Typography>
        <Image
          src={"/Gemini_Generated_Image_rywe9krywe9krywe.png"}
          alt="baby-image"
          width={458 / 7}
          height={441 / 7}
          style={{ marginTop: 16 }}
        />
      </Stack>
    </Box>
  );
}
