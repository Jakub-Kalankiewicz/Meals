import { useMutation } from "@apollo/client";
import { Box, Container, TextField, Typography, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../mutations/userMutations";
import { AuthContext } from "../../context/auth-context";
import CircularProgress from "@mui/material/CircularProgress";

const LoginForm = ({ setLogging, logging }) => {
  const nav = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const authContext = useContext(AuthContext);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      authContext.login(
        data.login.token,
        data.login.userId,
        data.login.tokenExpiration
      );
      nav("/");
    },
    onError: () => {
      setErrorMessage("Invalid email or password");
      setIsEmailValid(false);
      setIsPasswordValid(false);
    },
  });

  const handleEmailChange = (event) => {
    setErrorMessage("");
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setErrorMessage("");
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setPasswordValue(event.target.value);
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    login({
      variables: { email: emailValue, password: passwordValue },
    });
    if (errorMessage && isEmailValid && isPasswordValid) {
      setEmailValue("");
      setPasswordValue("");
    }
  };

  const handleEmailBlur = () => {
    if (emailValue === "") {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };
  const handlePasswordBlur = () => {
    if (passwordValue === "" || passwordValue < 6) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };
  return (
    <Box>
      <Typography
        variant="h1"
        textAlign="center"
        fontFamily="Playfair Display"
        fontStyle="italic"
        sx={{
          fontSize: {
            xs: "90px",
            sm: "150px",
            md: "100px",
            lg: "140px",
            xl: "190px",
          },
          "@media screen and (min-width: 1200px) and (min-height: 1360px)": {
            fontSize: "130px",
          },
        }}
      >
        Welcome!
      </Typography>
      <Typography variant="h6" textAlign="center" color="#e4a700">
        Sign In to use all features
      </Typography>
      <Container maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleSumbit}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "3rem",
          }}
        >
          <TextField
            id="email"
            label="Email"
            type={emailValue === "admin" ? "text" : "email"}
            variant="outlined"
            autoFocus={true}
            margin="normal"
            required
            onBlur={handleEmailBlur}
            error={!isEmailValid}
            onChange={handleEmailChange}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            required
            onBlur={handlePasswordBlur}
            error={!isPasswordValid}
            onChange={handlePasswordChange}
          />
          <Typography textAlign="center" sx={{ color: "red" }}>
            {errorMessage}
          </Typography>
          {!loading && (
            <Button variant="login-auth" type="sumbit">
              <Typography variant="h6" textTransform="none">
                Log in
              </Typography>
            </Button>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {loading && <CircularProgress sx={{ color: "black" }} />}
          </Box>
          <Button
            variant="registernow-auth"
            disableRipple
            onClick={() => {
              setLogging(!logging);
              nav("/auth/signup");
            }}
          >
            Don't have account? Register Now!
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
