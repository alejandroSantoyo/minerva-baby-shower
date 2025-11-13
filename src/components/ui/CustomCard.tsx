import { helloBeautyFont } from "@/styles/fonts";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface CustomCardProps {
  children: React.ReactNode;
  title: string;
  background?: string;
  stackDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  stackAlignItems?: string;
}

const CARD_MD_WIDTH = "528px";

export const CustomCard = ({
  children,
  title,
  background,
  stackDirection = "column",
  stackAlignItems = "center",
}: CustomCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: "90%", md: CARD_MD_WIDTH },
        background,
        pb: 4,
        mb: 6,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          textAlign="center"
          mt={6}
          mb={2}
          sx={{
            fontFamily: `${helloBeautyFont.style.fontFamily} !important`,
          }}
        >
          {title}
        </Typography>
        <Divider />
        <Box>
          <Stack
            direction={stackDirection}
            spacing={2}
            justifyContent="space-between"
            alignItems={stackAlignItems}
            mt={4}
          >
            {children}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
