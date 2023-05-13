import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import OrderForm from "./OrderForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "500px" },
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "20px",
  border: "2px solid #e4a700",
  boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.7)",
};

const OrderModal = ({
  handleOpenSnackbar,
  handleClose,
  clickHandler,
  open,
}) => {
  return (
    <>
      <Button variant="home-order" onClick={clickHandler}>
        Order Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OrderForm
            handleOpenSnackbar={handleOpenSnackbar}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default OrderModal;
