import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import Header from "./Header";

const RightDrawer = ({ open, onClose, component, width, title }) => {
  const list = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Make the container take the full height
        width: width,
      }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
      m={4}
    >
      <p>{title}</p>
      <Box mt={"20px"} sx={{ flex: 1, overflowY: "auto" }}>
        {component}
      </Box>
      <Box sx={{ p: 2 }}>
        <Button color="error" variant="contained" fullWidth onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ borderTopLeftRadius: "50px" }}>
      <Drawer
        
        anchor="right"
        open={open}
        onClose={onClose}
      >
        {list}
      </Drawer>
    </Box>
  );
};

export default RightDrawer;
