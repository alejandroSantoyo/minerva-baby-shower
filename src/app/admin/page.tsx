"use client";
import { helloBeautyFont } from "@/styles/fonts";
import { styled } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Invitation } from "app/[slug]/page";
import { PINK_PRIMARY_COLOR, PINK_SECONDARY_COLOR } from "constants/colors";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: PINK_SECONDARY_COLOR,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "bold",
  },
}));

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<
    "all" | "pending" | "confirmed" | "deny"
  >("all");
  const [newInvitation, setNewInvitation] = useState({
    guest: "",
    totalPasses: 0,
  });

  useEffect(() => {
    fetchGuests();
  }, []);

  async function fetchGuests() {
    const res = await fetch(`/api/admin/guests?key=${key}`);
    if (res.ok) {
      const data = await res.json();
      setInvitations(data);
      setAuthorized(true);
    }
  }

  async function createGuest() {
    if (!newInvitation.guest || !newInvitation.totalPasses) {
      return;
    }
    await fetch(`/api/admin/guests?key=${key}`, {
      method: "POST",
      body: JSON.stringify({
        ...newInvitation,
        slug: newInvitation.guest.trim().toLowerCase().split(" ").join("-"),
      }),
    });
    setNewInvitation({ guest: "", totalPasses: 0 });
    fetchGuests();
  }

  if (!authorized) {
    // TODO - Move this into a separte component
    return (
      <Box
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Card
          sx={{
            width: { xs: "90%", md: 500 },
            background: PINK_PRIMARY_COLOR,
            p: 4,
          }}
        >
          <CardContent>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                fetchGuests();
              }}
            >
              <Typography
                variant="h4"
                mb={4}
                sx={{
                  fontFamily: `${helloBeautyFont.style.fontFamily} !important`,
                }}
              >
                Login
              </Typography>
              <TextField
                label="Clave admin"
                fullWidth
                sx={{ mb: 4 }}
                onChange={(e) => setKey(e.target.value)}
              />
              <Button variant="contained" onClick={fetchGuests}>
                ENTRAR
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const getConfirmationStatus = (invitation: Invitation) => {
    if (!invitation.confirmed) {
      return "⚠️ No ha confirmado";
    } else if (invitation.confirmed && (invitation.confirmedPasses || 0) > 0) {
      return "✅ Confirmo asistencia";
    } else {
      return "❌ No asistirá";
    }
  };

  const handleCopyLink = async (guest: string, slug: string) => {
    try {
      const baseUrl = window.location.origin;
      const message = `Hola *${guest}*, nos encantaría que fueras parte del baby shower de Minerva, aquí tienes tu invitación. \nPor favor, abre el siguiente link y confirma tu asistencia. \n${baseUrl}/${slug}`;
      await navigator.clipboard.writeText(message);
      setIsSnackOpen(true);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  // move this into a separate state an it's corresponding use effect
  const getFilteredInvitations = () => {
    if (filterBy === "all") return invitations;

    if (filterBy === "confirmed") {
      return invitations.filter(({ confirmed, confirmedPasses }) => {
        return confirmed && confirmedPasses && confirmedPasses > 0;
      });
    } else if (filterBy === "deny") {
      return invitations.filter(({ confirmed, confirmedPasses }) => {
        return confirmed && confirmedPasses === 0;
      });
    } else {
      return invitations.filter(({ confirmed }) => {
        return !confirmed;
      });
    }
  };

  return (
    <Box p={8} height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Typography
        variant="h2"
        mb={4}
        textAlign={"center"}
        sx={{
          fontFamily: `${helloBeautyFont.style.fontFamily} !important`,
        }}
      >
        Invitaciones
      </Typography>

      {/* Create Invitation form */}
      <Typography variant="h6" mb={2}>
        Agregar Invitación
      </Typography>
      <Stack direction="row" spacing={2} mb={4}>
        <TextField
          label="Invitado o Familia"
          placeholder="Invitado o Familia"
          fullWidth
          sx={{ mb: 4, minWidth: 200 }}
          value={newInvitation.guest}
          size="small"
          onChange={(e) =>
            setNewInvitation({ ...newInvitation, guest: e.target.value })
          }
        />
        <TextField
          label="No. de invitaciones"
          placeholder="Ingresa el número de invitados"
          type="number"
          fullWidth
          sx={{ mb: 4, minWidth: 200 }}
          value={newInvitation.totalPasses}
          size="small"
          onChange={(e) =>
            setNewInvitation({
              ...newInvitation,
              totalPasses: Number(e.target.value),
            })
          }
        />
        <Button
          variant="contained"
          onClick={createGuest}
          fullWidth
          sx={{ background: PINK_SECONDARY_COLOR }}
        >
          Crear invitación
        </Button>
      </Stack>

      {/* Resume */}
      <Stack direction="row" spacing={3} alignItems={"center"} mb={4}>
        <Typography>
          Asistirán:
          {invitations
            .map((invitation) => invitation.confirmedPasses || 0)
            .reduce((prev, current) => {
              return prev + current;
            }, 0)}{" "}
          invitados
        </Typography>
        <Typography>
          Invitaciones restantes:
          {50 -
            invitations
              .map((invitation) => invitation.confirmedPasses || 0)
              .reduce((prev, current) => {
                return prev + current;
              }, 0)}
        </Typography>
        {/* Filter By */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="show-by-input">Mostrar</InputLabel>
          <Select
            labelId="show-by-input"
            id="input-filter"
            value={filterBy}
            label="Mostrar"
            onChange={(event) => setFilterBy(event.target.value)}
          >
            <MenuItem value={"all"}>Todos</MenuItem>
            <MenuItem value={"pending"}>Pendientes de confirmar</MenuItem>
            <MenuItem value={"confirmed"}>Confirmados</MenuItem>
            <MenuItem value={"deny"}>No asistirán</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Invitation List */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="right">Invitado(s)</StyledTableCell>
              <StyledTableCell align="right">Confirmado</StyledTableCell>
              <StyledTableCell align="right">Pases totales</StyledTableCell>
              <StyledTableCell align="right">Pases confirmados</StyledTableCell>
              <StyledTableCell align="right">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredInvitations().map((invitation: Invitation) => (
              <TableRow
                key={invitation.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {invitation.id}
                </TableCell>
                <TableCell align="right">{invitation.guest}</TableCell>
                <TableCell align="right">
                  {getConfirmationStatus(invitation)}
                </TableCell>
                <TableCell align="right">{invitation.totalPasses}</TableCell>
                <TableCell align="right">
                  {invitation.confirmedPasses ?? "N/A"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      handleCopyLink(invitation.guest, invitation.slug)
                    }
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={isSnackOpen}
        autoHideDuration={2500}
        onClose={() => setIsSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setIsSnackOpen(false)} severity="success">
          URL de invitación copiada!
        </Alert>
      </Snackbar>
    </Box>
  );
}
