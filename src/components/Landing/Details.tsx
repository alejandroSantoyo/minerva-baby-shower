"use client";
import {
  Alert,
  Button,
  Slider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  CalendarMonth as CalendarIcon,
  Place as PlaceIcon,
  SvgIconComponent,
  CardGiftcard,
  Savings as SavingsIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { CustomCard } from "../ui/CustomCard";
import {
  PINK_PRIMARY_COLOR,
  PINK_SECONDARY_COLOR,
  WHITE_COLOR,
} from "constants/colors";
import ConfirmationDialog from "../ui/ConfirmationDialog";
import { Invitation } from "app/[slug]/page";

interface DetailItemProps {
  icon: SvgIconComponent;
  title: string;
  description: string;
}

interface GiftButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: SvgIconComponent;
}

interface DetailsProps {
  invitation: Invitation;
}

const CLABE = "6381 8000 0169 4925 53";

const DetailItem = ({ icon: Icon, title, description }: DetailItemProps) => {
  return (
    <Stack alignItems="center" justifyContent="center" flex={1}>
      <Icon fontSize="large" sx={{ color: PINK_SECONDARY_COLOR }} />
      <Typography variant="subtitle1" mt={2} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" fontWeight="bold" textAlign="center">
        {description}
      </Typography>
    </Stack>
  );
};

const GiftButton = ({
  href,
  children,
  onClick,
  icon: Icon = CardGiftcard,
}: GiftButtonProps) => {
  const linkProps = href
    ? {
        href,
        target: "_blank",
      }
    : {};

  return (
    <Button
      {...linkProps}
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor: PINK_SECONDARY_COLOR,
        color: PINK_SECONDARY_COLOR,
        fontWeight: "bold",
      }}
    >
      <Icon sx={{ mr: 1 }} />
      {children}
    </Button>
  );
};

const getGuestText = (passes: number) => {
  if (passes > 1 || passes === 0) {
    return `${passes} personas`;
  }
  return `${passes} persona`;
};

const AfterConfirmationCard = ({ invitation }: { invitation: Invitation }) => {
  return (
    <CustomCard
      title="Gracias por confirmar tu asistencia"
      background={PINK_PRIMARY_COLOR}
    >
      <Typography variant="h6" textAlign="center">
        Nos hace muy felices poder compartir este día tan especial contigo. Si
        aún no lo has hecho, te invitamos a revisar nuestra mesa de regalos.
        ¡Gracias por tu cariño!
      </Typography>
      <Typography fontSize={18} fontWeight="bold">
        Invitación valida para: {getGuestText(invitation.confirmedPasses || 0)}
      </Typography>
    </CustomCard>
  );
};

export default function Details({ invitation }: DetailsProps) {
  const [usedPassess, setUsedPassess] = useState(1);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
    contentText: "",
  });
  const [confirmationAction, setConfirmationAction] = useState<
    "confirm" | "deny"
  >();

  const details: DetailItemProps[] = [
    {
      icon: CalendarIcon,
      title: "Fecha",
      description: "10 de Enero del 2026",
    },
    {
      icon: AccessTime,
      title: "Hora",
      description: "02:30 p.m.",
    },
    {
      icon: PlaceIcon,
      title: "Lugar",
      description:
        "Salón de usos multiples. Cto Hacienda Tulipanes #398, Capellanía Residencial",
    },
  ];

  const handleClabeClick = async () => {
    try {
      await navigator.clipboard.writeText(CLABE.replace(/\s+/g, ""));
      setIsSnackOpen(true);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  const handleSnackClose = () => setIsSnackOpen(false);

  const handleConfirmationOpen = (action: "confirm" | "deny") => {
    setModalProps({
      title:
        action === "confirm"
          ? `Confirmar asistencia para ${getGuestText(usedPassess)}.`
          : "Confirmar NO asistencia.",
      contentText:
        action === "confirm"
          ? `Estás confirmando asistencia para ${getGuestText(
              usedPassess
            )}, ¿quieres confirmar? (No podrás cambiar esto después).`
          : "Nos entristece no contar contigo en el evento, ¿quieres confirmar tu NO asistencia? (No podrás cambiar esto después).",
    });
    setIsModalOpen(true);
    setConfirmationAction(action);
  };

  const handleConfirmInvitation = async () => {
    const data = await fetch(
      `/api/invitation/${invitation.slug}/confirmation`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confirmed: true,
          confirmedPasses: confirmationAction === "confirm" ? usedPassess : 0,
        }),
      }
    );

    if (data.ok) {
      const response = await data.json();
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* Event details */}
      <CustomCard
        stackDirection="row"
        stackAlignItems="flex-start"
        title="Detalles del Evento"
      >
        {details.map((detail) => (
          <DetailItem key={detail.title} {...detail} />
        ))}
      </CustomCard>

      {/* Confirmation */}
      {invitation.confirmed && (
        <AfterConfirmationCard invitation={invitation} />
      )}
      {!invitation.confirmed && (
        <CustomCard
          title="Confirma tu Asistencia"
          background={PINK_PRIMARY_COLOR}
        >
          <Typography fontSize={18}>
            Pases restantes {invitation.totalPasses - usedPassess}
          </Typography>
          <Typography fontSize={18}>¿Cuántos pases utilizarás?</Typography>

          <Slider
            size="small"
            max={invitation.totalPasses}
            value={usedPassess}
            onChange={(_, value) => setUsedPassess(value)}
            sx={{
              width: "80%",
              color: PINK_SECONDARY_COLOR,
              height: 4,
              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
                backgroundColor: WHITE_COLOR,
                border: `2px solid ${PINK_SECONDARY_COLOR}`,
              },
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-rail": {
                opacity: 0.4,
                backgroundColor: PINK_SECONDARY_COLOR,
              },
            }}
          />

          <Typography variant="h6" fontWeight="bold">
            {usedPassess}
            {usedPassess > 1 || usedPassess === 0 ? " Invitados" : " Invitado"}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              sx={{
                background: PINK_SECONDARY_COLOR,
                fontWeight: "bold",
              }}
              onClick={() => handleConfirmationOpen("confirm")}
            >
              Confirmar
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: PINK_SECONDARY_COLOR,
                color: PINK_SECONDARY_COLOR,
                fontWeight: "bold",
              }}
              onClick={() => handleConfirmationOpen("deny")}
            >
              No asistiré
            </Button>
          </Stack>
        </CustomCard>
      )}

      {/* Gifts */}
      <CustomCard title="Mesas de Regalo" stackAlignItems="unset">
        <GiftButton href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51720573">
          Liverpool
        </GiftButton>
        <GiftButton href="https://www.amazon.com.mx/baby-reg/alejandro-santoyo-paulina-venegas-febrero-2026-leondelosaldama/2LJ58D6Z0BU26">
          Amazon
        </GiftButton>
        <GiftButton onClick={handleClabeClick} icon={SavingsIcon}>
          CLABE: {CLABE}
        </GiftButton>
        <Snackbar
          open={isSnackOpen}
          autoHideDuration={2500}
          onClose={handleSnackClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackClose} severity="success">
            Clabe copiada al portapapeles!
          </Alert>
        </Snackbar>
        <ConfirmationDialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleConfirmInvitation()}
          {...modalProps}
        />
      </CustomCard>
    </>
  );
}
