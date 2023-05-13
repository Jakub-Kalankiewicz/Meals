import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import PersonIcon from "@mui/icons-material/Person";

const Counter = ({ quantity, setQuantity }) => {
  const handleIncrement = () => {
    if (quantity < 20) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        onClick={handleIncrement}
        sx={{
          color: "black",
          "&:hover": {
            color: "#ffc800",
          },
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <Button
        endIcon={<PersonIcon fontSize="large" />}
        sx={{
          "&.Mui-disabled": {
            color: "#e4a700",
          },
        }}
        disabled
        size="large"
      >
        {quantity}
      </Button>

      <IconButton
        onClick={handleDecrement}
        sx={{
          color: "black",
          "&:hover": {
            color: "#ffc800",
          },
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
    </Box>
  );
};

export default Counter;
