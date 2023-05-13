import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ADD_ORDER } from "../../mutations/orderMutations";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { styled } from "@mui/material/styles";
import "./OrderForm.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dayjs from "dayjs";
import Counter from "../utils/Counter";
import { GET_USER_ORDERS } from "../../queries/usersQueries";

const OrderFormTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
  },
  "& .MuiFilledInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
    "&:after": {
      borderBottom: "2px solid black",
    },
  },
}));

const CustomCheckbox = styled(Checkbox)((theme) => ({
  "&:hover": {
    backgroundColor: "transparent",
  },
  "& .Mui-checked": {
    color: "red",
  },
  "& .MuiCheckbox-colorPrimary": {
    color: "red",
  },
}));

const OrderForm = ({ handleOpenSnackbar, handleClose }) => {
  const [descriptionValue, setDescriptionValue] = useState(" ");
  const [dateFromValue, setDateFromValue] = useState();
  const [dateToValue, setDateToValue] = useState();
  const [amountValue, setAmountValue] = useState(0);
  const [quantityValue, setQuantityValue] = useState(1);
  const [statusValue, setStatusValue] = useState("new");
  const [checkBox, setCheckBox] = useState(false);
  const nav = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (quantityValue !== "" && dateFromValue && dateToValue) {
      const diffInDays = Math.floor(dateToValue.diff(dateFromValue) / 86400000);
      setAmountValue((diffInDays + 1) * 30 * quantityValue);
      if (checkBox) setAmountValue((a) => a + 15);
    }
  }, [quantityValue, dateFromValue, dateToValue, checkBox]);

  const handleBack = () => {
    handleClose();
  };

  const handleCheckBox = () => {
    setCheckBox(!checkBox);
  };

  //Add Order
  const [addOrder, { loading }] = useMutation(ADD_ORDER, {
    onCompleted: (data) => {
      handleBack();
      handleOpenSnackbar();
      handleClose();
    },
    onError: () => {
      handleBack();
    },
    refetchQueries: [
      { query: GET_USER_ORDERS, variables: { id: authContext.userId } },
    ],
  });

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };
  const handleDateFromChange = (event) => {
    const date = dayjs(event);
    setDateFromValue(date);
  };
  const handleDateToChange = (event) => {
    const date = dayjs(event);
    setDateToValue(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (amountValue !== 0) {
      if (!authContext.token) nav("/auth/signin");
      const name = amountValue + " " + descriptionValue;

      addOrder({
        variables: {
          name: name,
          description: descriptionValue,
          status: statusValue,
          dateFrom: dateFromValue.toISOString(),
          dateTo: dateToValue.toISOString(),
          quantity: +quantityValue,
          amount: +amountValue,
        },
      });
      setDescriptionValue("");
      setStatusValue("new");
      setAmountValue(0);
      setQuantityValue(1);
      setDateFromValue();
      setDateToValue();
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "1rem", sm: "0.5rem" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { xs: "40px", sm: "65px" },
            color: "#e4a700",
          }}
        >
          Create Order
        </Typography>
        <Counter quantity={quantityValue} setQuantity={setQuantityValue} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "1rem", sm: "2rem" },
            justifyContent: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Start Date"
                onChange={handleDateFromChange}
                minDate={dayjs()}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="End Date"
                onChange={handleDateToChange}
                minDate={dayjs(dateFromValue)}
                disabled={dateFromValue ? false : true}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          justifyContent="center"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <CustomCheckbox
                onClick={handleCheckBox}
                size="medium"
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
                color="success"
              />
            }
            componentsProps={{
              typography: {
                fontSize: { xs: "8px", sm: "15px" },
              },
            }}
            label="U can add extra one dessert and free drink for only 15zł!"
          />
          <OrderFormTextField
            autoComplete="off"
            autoCorrect="off"
            variant="filled"
            label="Extra notes"
            type="text"
            value={descriptionValue}
            fullWidth
            onChange={handleDescriptionChange}
            sx={{}}
          />
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "1rem",
            }}
          >
            <Typography variant="h6" fontWeight="400">
              To Pay: <span style={{ fontWeight: "700" }}>{amountValue}</span>{" "}
              PLN
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-evenly"
          gap="2rem"
          width="100%"
        >
          <Button
            type="button"
            variant="order"
            sx={{
              fontFamily: "Courier New, Courier, monospace",
              "&:hover": {
                color: "#e4a700",
              },
              fontSize: { xs: "20px", sm: "30px" },
            }}
            onClick={handleBack}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="order"
            sx={{
              fontFamily: "Courier New, Courier, monospace",
              fontSize: { xs: "20px", sm: "30px" },
              "&:hover": {
                color: "#e4a700",
              },
            }}
          >
            Submit
          </Button>
        </Box>
        <Box
          sx={{
            flexBasis: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading && (
            <CircularProgress
              sx={{
                color: "black",
                "&:hover": {
                  color: "#e4a700",
                },
              }}
              size={30}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrderForm;
