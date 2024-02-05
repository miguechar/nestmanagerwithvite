import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBarComponent({
  open,
  onClose,
  message,
  severity,
}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <div>
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
}
