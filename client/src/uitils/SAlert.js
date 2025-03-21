import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useMsg from "../aip context/alert/useMsg";

export default function SAlert() {
  const [open, setOpen] = React.useState(false);
  const { msg } = useMsg();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (msg.data?.length > 0) {
      setOpen(true);
    }
  }, [msg]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={msg.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg.data}
        </Alert>
      </Snackbar>
    </div>
  );
}
