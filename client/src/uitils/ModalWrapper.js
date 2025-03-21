import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import "./utilis.css";

export default function ModalWrapper({
  title,
  open,
  handleClose,
  handleOk,
  handleCancel,
  children,
}) {
  return (
    <>
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="board">
          <Typography className="modal-title">{title}</Typography>
          <Grid container spacing={1}>
            <Grid size={12}>
              <Box>{children}</Box>
            </Grid>
            <Grid size={4} />
            <Grid size={4}>
              <ButtonGroup disableElevation variant="contained" color="success">
                <Button color="success" size="large" onClick={handleOk}>
                  Ok
                </Button>
                <Button color="error" size="large" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid size={4} />
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
