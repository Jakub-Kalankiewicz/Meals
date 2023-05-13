import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/logo/logo.png";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import "../styles/Auth.css";

const Auth = () => {
  const loc = useLocation();
  const state = loc.pathname === "/auth/signin" ? true : false;
  const [logging, setLogging] = useState(state);

  return (
    <>
      <Box
        sx={{
          width: "55%",
          height: "100vh",
          backgroundColor: "black",
          float: logging ? "left" : "right",
          display: { xs: "none", md: "flex" },
        }}
      >
        <img src={logo} alt="logo" style={{ height: "100%", width: "100%" }} />
      </Box>
      <Box
        sx={{
          width: { xs: "100vw", md: "45%" },
          height: "100vh",
          backgroundColor: "white",
          float: logging ? "right" : "left",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {logging && <LoginForm setLogging={setLogging} logging={logging} />}
        {!logging && <SignupForm setLogging={setLogging} logging={logging} />}
      </Box>
    </>
  );
};

export default Auth;
