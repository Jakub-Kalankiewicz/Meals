import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Typography, Snackbar } from "@mui/material";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { GET_USER_ORDERS } from "../queries/usersQueries";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/Order/OrderCard";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Order = () => {
  const authContext = useContext(AuthContext);
  const nav = useNavigate();
  const [newData, setNewData] = useState();
  const [progressData, setProgressData] = useState();
  const [completeedData, setCompletedData] = useState();
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

  const { loading, data } = useQuery(GET_USER_ORDERS, {
    variables: { id: authContext.userId },
    alias: "getUserOrders",
  });

  useEffect(() => {
    if (data && data.user) {
      setNewData(
        data.user.createdOrders.filter(
          (order) => order.status === "Not Started"
        )
      );
      setProgressData(
        data.user.createdOrders.filter(
          (order) => order.status === "In Progress"
        )
      );
      setCompletedData(
        data.user.createdOrders.filter((order) => order.status === "Completed")
      );
    }
  }, [data]);

  useEffect(() => {
    if (!authContext.token) {
      nav("/");
    }
  }, [authContext, nav]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "70px",
        gap: "3rem",
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
        }}
      >
        My Orders
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          marginBottom: "3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && (
          <CircularProgress
            sx={{
              color: "black",
            }}
            size={30}
          />
        )}
        {!loading && progressData && progressData.length !== 0 ? (
          progressData.map((order, index) => (
            <OrderCard
              {...order}
              key={order.id}
              handleOpenSnackbar={handleOpenSnackbar}
            />
          ))
        ) : (
          <Typography sx={{ fontSize: "30px", fontFamily: "Courier New" }}>
            No in progress orders
          </Typography>
        )}
        {!loading && newData && newData.length !== 0 ? (
          newData.map((order, index) => (
            <OrderCard
              {...order}
              key={order.id}
              handleOpenSnackbar={handleOpenSnackbar}
            />
          ))
        ) : (
          <Typography sx={{ fontSize: "30px", fontFamily: "Courier New" }}>
            No new orders
          </Typography>
        )}
        {!loading && completeedData && completeedData.length !== 0 ? (
          completeedData.map((order, index) => (
            <OrderCard
              {...order}
              key={order.id}
              handleOpenSnackbar={handleOpenSnackbar}
            />
          ))
        ) : (
          <Typography sx={{ fontSize: "30px", fontFamily: "Courier New" }}>
            No completed orders
          </Typography>
        )}
      </Box>
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
          Your order has been successfully canceled!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Order;
