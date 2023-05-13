import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#1A1A19",
          color: "#e4a700",
          p: 1,
          zIndex: 9,
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography>All Rights Reserved &copy; Meals</Typography>
      </Box>
    </>
  );
};

export default Footer;
