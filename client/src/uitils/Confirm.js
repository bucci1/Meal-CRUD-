import React from "react";
import ModalWrapper from "./ModalWrapper";
import Typography from "@mui/material/Typography";

export default function Confirm({
  title,
  text,
  open,
  handleOk,
  handleCancel,
  handleClose,
}) {
  return (
    <ModalWrapper
      open={open}
      title={title}
      handleOk={handleOk}
      handleClose={handleClose}
      handleCancel={handleCancel}
    >
      <Typography className="modal-text">{text}</Typography>
    </ModalWrapper>
  );
}
