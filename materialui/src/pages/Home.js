import { Box, Typography } from "@mui/material";
import meal from "../assets/AboutUs/meal5.png";
import "../styles/Home.css";
import { useContext, forwardRef, useState } from "react";
import { AuthContext } from "./../context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import OrderModal from "./../components/Order/OrderModal";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HomePage = () => {
  const nav = useNavigate();
  const authContext = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clickHandler = () => {
    if (!authContext.token) {
      nav("/auth/signin");
    } else {
      handleOpen();
    }
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        className="home"
        sx={{
          backgroundImage: {
            xs: `url(${meal})`,
            sm: `linear-gradient(to left, rgba(7, 7, 7, 0) 0%, rgba(7, 7, 7, 0.5) 50%, rgba(7, 7, 7, 0.8) 60%, rgba(7, 7, 7, 1) 70%), url(${meal})`,
          },
        }}
      >
        <Box className="headerContainer" sx={{ marginLeft: { xl: "4rem" } }}>
          <Typography variant="h1">Polish Canteen</Typography>
          <Typography component="h2">Best Food In Poland</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              width: { xs: "100%", sm: "500px" },
            }}
          >
            <Typography
              component="p"
              sx={{
                color: "#f6e7b1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span id="span1">
                You can order a prepaid card{" "}
                <span
                  style={{
                    fontWeight: "700",
                    color: "#e4a700",
                    cursor: "pointer",
                  }}
                  onClick={clickHandler}
                >
                  RIGHT NOW!
                </span>
                .
              </span>{" "}
              It allows you to pick up one breakfast, soup and main course per
              day!{" "}
              {!authContext.token && (
                <>
                  <span id="span2">
                    All you have to do is{" "}
                    <span
                      style={{
                        fontWeight: "700",
                        color: "#e4a700",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        nav("/auth/signin");
                      }}
                    >
                      LOG IN!
                    </span>
                  </span>
                </>
              )}
            </Typography>
            <OrderModal
              handleOpenSnackbar={handleOpenSnackbar}
              clickHandler={clickHandler}
              handleClose={handleClose}
              open={open}
            />
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
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
          Your order has been successfully completed!
          <br />
          <Link style={{ color: "black" }} to="/orders">
            Click Here to see all your orders!
          </Link>
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomePage;
