import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import { ADD_USER } from "../../mutations/userMutations";
import { useMutation } from "@apollo/client";
import Zoom from "@mui/material/Zoom";
import ErrorIcon from "@mui/icons-material/Error";

const PhoneTextField = (props) => {
  return (
    <InputMask mask="(+48)999-999-999" {...props}>
      {() => <TextField {...props} />}
    </InputMask>
  );
};
const tooltipText = (
  <div>
    <span>Information regarding registration form validation:</span> <br />
    <span>- Email must be a valid address and cannot be already used</span>
    <br />
    <span>- Password must be at least 6 characters long</span>
    <br />
    <span>- Phone number must be in the format +48 ###-###-###</span>
    <br />
    <br />
    <span>Please make sure all fields are filled out correctly.</span>
    <br />
  </div>
);

const SignupForm = ({ setLogging, logging }) => {
  const nav = useNavigate();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPassValue, setRepeatPassValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState(false);

  const [nameState, setNameState] = useState({ valid: false, invalid: false });
  const [emailState, setEmailState] = useState({
    valid: false,
    invalid: false,
  });
  const [passwordState, setPasswordState] = useState({
    valid: false,
    invalid: false,
  });
  const [repeatPassState, setRepeatPassState] = useState({
    valid: false,
    invalid: false,
  });
  const [phoneState, setPhoneState] = useState({
    valid: false,
    invalid: false,
  });

  const handleBlurName = () => {
    if (nameValue !== "") {
      setNameState({ valid: true, invalid: false });
    } else {
      setNameState({ valid: false, invalid: true });
    }
  };
  const handleBlurEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(emailValue)) {
      setEmailState({ valid: true, invalid: false });
    } else {
      setEmailState({ valid: false, invalid: true });
    }
  };
  const handleBlurPass = () => {
    if (passwordValue !== "" && passwordValue.length > 6) {
      setPasswordState({ valid: true, invalid: false });
    } else {
      setPasswordState({ valid: false, invalid: true });
    }
  };
  const handleBlurRepeatPass = () => {
    if (
      repeatPassValue !== "" &&
      repeatPassValue.length > 6 &&
      repeatPassValue === passwordValue
    ) {
      setRepeatPassState({ valid: true, invalid: false });
    } else {
      setRepeatPassState({ valid: false, invalid: true });
    }
  };
  const handleBlurPhone = () => {
    const regex = /^\(\+48\)\d{3}-\d{3}-\d{3}$/;
    if (regex.test(phoneValue)) {
      setPhoneState({ valid: true, invalid: false });
    } else {
      setPhoneState({ valid: false, invalid: true });
    }
  };

  const handleName = (event) => {
    setError(false);
    setNameValue(event.target.value);
  };
  const handleEmail = (event) => {
    setError(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(event.target.value)) {
      setEmailState({ valid: true, invalid: false });
    } else {
      setEmailState({ valid: false, invalid: true });
    }
    setEmailValue(event.target.value);
  };
  const handlePassword = (event) => {
    setError(false);
    if (event.target.value !== "" && event.target.value.length > 6) {
      setPasswordState({ valid: true, invalid: false });
    } else {
      setPasswordState({ valid: false, invalid: true });
    }
    setPasswordValue(event.target.value);
  };
  const handleRepeatPass = (event) => {
    setError(false);
    if (
      event.target.value !== "" &&
      event.target.value.length > 6 &&
      event.target.value === passwordValue
    ) {
      setRepeatPassState({ valid: true, invalid: false });
    } else {
      setRepeatPassState({ valid: false, invalid: true });
    }
    setRepeatPassValue(event.target.value);
  };
  const handlePhone = (event) => {
    setError(false);
    const regex = /^\(\+48\)\d{3}-\d{3}-\d{3}$/;
    if (regex.test(event.target.value)) {
      setPhoneState({ valid: true, invalid: false });
    } else {
      setPhoneState({ valid: false, invalid: true });
    }
    setPhoneValue(event.target.value);
  };

  const [addUser, { loading }] = useMutation(ADD_USER, {
    variables: {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      password: passwordValue,
    },
    onCompleted: (data) => {
      setNameState({ valid: false, invalid: false });
      setEmailState({ valid: false, invalid: false });
      setPasswordState({ valid: false, invalid: false });
      setRepeatPassState({ valid: false, invalid: false });
      setPhoneState({ valid: false, invalid: false });
      setNameValue("");
      setPasswordValue("");
      setRepeatPassValue("");
      setPhoneValue("");
      setEmailValue("");
      setLogging(!logging);
      nav("/auth/signin");
    },
    onError: (error) => {
      setError(true);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !error &&
      !loading &&
      nameState.valid &&
      emailState.valid &&
      phoneState.valid &&
      passwordState.valid &&
      repeatPassState.valid
    ) {
      addUser(nameValue, emailValue, phoneValue, passwordValue);
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
            lg: "135px",
            xl: "190px",
          },
          "@media screen and (min-width: 1200px) and (min-height: 1360px)": {
            fontSize: "130px",
          },
        }}
      >
        Welcome!
      </Typography>
      <Typography
        variant="h6"
        textAlign="center"
        color="#e4a700"
        marginBottom="0"
      >
        Sign Up to use all features
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1.5rem",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Tooltip title={tooltipText} TransitionComponent={Zoom}>
              <IconButton
                sx={{
                  textAlign: "center",
                  margin: 0,
                  padding: 0,
                  width: "24px",
                  height: "24px",
                }}
                disableRipple
              >
                <InfoIcon sx={{ color: error ? "red" : "black" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap="1rem"
          >
            {nameState.valid && (
              <CheckCircleIcon sx={{ color: "green", fontSize: "1.5rem" }} />
            )}
            <TextField
              fullWidth
              error={nameState.invalid}
              id="name"
              label="Username"
              type="text"
              variant="outlined"
              autoFocus={true}
              margin="normal"
              required
              onBlur={handleBlurName}
              onChange={handleName}
              autoComplete="off"
              autoCorrect="off"
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap="1rem"
          >
            {emailState.valid && !error && (
              <CheckCircleIcon sx={{ color: "green", fontSize: "1.5rem" }} />
            )}
            {error && emailState.valid && <ErrorIcon sx={{ color: "red" }} />}
            <TextField
              fullWidth
              error={emailState.invalid}
              value={emailValue}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              onBlur={handleBlurEmail}
              onChange={handleEmail}
              autoComplete="off"
              autoCorrect="off"
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap="1rem"
          >
            {passwordState.valid && (
              <CheckCircleIcon sx={{ color: "green", fontSize: "1.5rem" }} />
            )}
            <TextField
              fullWidth
              error={passwordState.invalid}
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              required
              onBlur={handleBlurPass}
              onChange={handlePassword}
              autoComplete="off"
              autoCorrect="off"
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap="1rem"
          >
            {repeatPassState.valid && (
              <CheckCircleIcon sx={{ color: "green", fontSize: "1.5rem" }} />
            )}
            <TextField
              fullWidth
              error={repeatPassState.invalid}
              id="repeat-password"
              type="password"
              label="Repeat Password"
              variant="outlined"
              margin="normal"
              required
              onBlur={handleBlurRepeatPass}
              onChange={handleRepeatPass}
              autoComplete="off"
              autoCorrect="off"
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap="1rem"
          >
            {phoneState.valid && (
              <CheckCircleIcon sx={{ color: "green", fontSize: "1.5rem" }} />
            )}
            <PhoneTextField
              fullWidth
              error={phoneState.invalid}
              id="phone"
              type="phone"
              label="Phone Number"
              variant="outlined"
              margin="normal"
              required
              onBlur={handleBlurPhone}
              onChange={handlePhone}
              autoComplete="off"
              autoCorrect="off"
            />
          </Box>
        </Box>
        {!loading && (
          <Button variant="login-auth" type="submit">
            <Typography variant="h6" textTransform="none">
              Register Now!
            </Typography>
          </Button>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading && <CircularProgress sx={{ color: "black" }} />}
        </Box>
        <Button
          variant="registernow-auth"
          disableRipple
          onClick={() => {
            setLogging(!logging);
            nav("/auth/signin");
          }}
        >
          Already registered? Log in Now!
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
