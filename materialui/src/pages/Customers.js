import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Typography, Snackbar } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { GET_ORDERS } from "../queries/orderQueries";
import CustomerOrderCard from "../components/Customers/CustomerOrderCard";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Customers = () => {
  const [progressData, setProgressData] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const { loading, data } = useQuery(GET_ORDERS);
  useEffect(() => {
    if (data && data.orders) {
      setProgressData(
        data.orders.filter((order) => order.status === "In Progress")
      );
    }
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "70px",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "3rem",
      }}
    >
      <Typography
        textAlign="center"
        fontFamily="Playfair Display"
        fontStyle="italic"
        sx={{
          backgroundClip: "text",
          color: "transparent",
          backgroundImage: `linear-gradient(to bottom left, black 30%, #e4a700 60%)`,
          fontSize: { xs: "70px", sm: "130px", md: "170px" },
          marginBottom: "2rem",
        }}
      >
        Customers
      </Typography>
      {loading && (
        <CircularProgress
          sx={{
            color: "black",
          }}
          size={30}
        />
      )}
      {!loading && progressData && progressData.length !== 0 ? (
        progressData.map((order) => (
          <CustomerOrderCard
            {...order}
            key={order.id}
            handleOpenSnackbar={handleOpenSnackbar}
          />
        ))
      ) : (
        <Typography sx={{ fontSize: "30px", fontFamily: "Courier New" }}>
          No orders
        </Typography>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        sx={{ zIndex: 10 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          Your order has been successfully accepted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Customers;
