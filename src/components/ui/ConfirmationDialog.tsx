import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { PINK_SECONDARY_COLOR } from "constants/colors";

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  contentText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function ConfirmationDialog({
  open,
  title,
  contentText,
  onClose,
  onConfirm,
}: Readonly<ConfirmationDialogProps>) {
  const [action, setAction] = useState<"confirm" | "decline" | null>(null);

  const handleClose = (confirmed: boolean) => {
    if (confirmed && action === "confirm") {
      console.log("Asistencia confirmada");
    }
    if (confirmed && action === "decline") {
      console.log("No asistiré");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText textAlign={"justify"}>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: PINK_SECONDARY_COLOR }} onClick={onClose}>
          Cancelar
        </Button>
        <Button color="warning" onClick={onConfirm} autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
}
