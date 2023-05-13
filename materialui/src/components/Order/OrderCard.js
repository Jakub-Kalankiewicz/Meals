import {
  Typography,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import {
  DELETE_ORDER,
  UPDATE_ORDER_STATUS,
} from "../../mutations/orderMutations";
import { GET_USER_ORDERS } from "../../queries/usersQueries";
import { AuthContext } from "../../context/auth-context";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";

const OrderCard = ({
  id,
  name,
  description,
  status,
  amount,
  quantity,
  dateTo,
  dateFrom,
  handleOpenSnackbar,
}) => {
  const authContext = useContext(AuthContext);
  const dateFromValue = dayjs(dateFrom).format("DD/MM/YYYY");
  const dateToValue = dayjs(dateTo).format("DD/MM/YYYY");
  const [show, setShow] = useState(false);
  const today = dayjs();
  const updateStatusValue = (newStatusValue) => {
    updateOrder({ variables: { id, status: newStatusValue } })
      .then(() => {})
      .catch((error) => {});
  };

  const setStatusValue = () => {
    const diffFrom = today.diff(dayjs(dateFrom), "days");
    const diffTo = today.diff(dayjs(dateTo), "days");
    let newStatusValue = status;
    if (diffFrom === 0 || diffTo === 0) {
      newStatusValue = "progress";
    } else if (diffFrom > 0 && diffTo > 0) {
      newStatusValue = "completed";
    }
    return newStatusValue;
  };

  useEffect(() => {
    const newStatusValue = setStatusValue();
    if (newStatusValue !== status) {
      updateStatusValue(newStatusValue);
    }
  }, []);

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    variables: { id: id },
    refetchQueries: [
      { query: GET_USER_ORDERS, variables: { id: authContext.userId } },
    ],
  });

  const [updateOrder] = useMutation(UPDATE_ORDER_STATUS, {
    refetchQueries: [
      { query: GET_USER_ORDERS, variables: { id: authContext.userId } },
    ],
  });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: { xs: "250px", sm: "350px", md: "800px", lg: "1000px" },
        padding: { xs: "0.2rem", sm: "0.5rem", md: "1rem" },
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "black",
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <CardActionArea
          onClick={() => {
            setShow(!show);
          }}
        >
          <CardContent
            sx={{
              color: "white",
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography sx={{ fontSize: "30px" }}>{quantity}</Typography>
              <PeopleAltSharpIcon fontSize="large" sx={{ color: "#e4a700" }} />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <Typography sx={{ display: "flex", gap: "0.5rem" }}>
                <CalendarMonthIcon sx={{ color: "#e4a700" }} />
                {dateFromValue}
              </Typography>
              <Typography sx={{ display: "flex", gap: "0.5rem" }}>
                <CalendarMonthIcon sx={{ color: "#e4a700" }} />
                {dateToValue}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  paddingTop: "3px",
                  fontSize: "30px",
                  fontFamily: "Courier New",
                }}
              >
                {amount}
              </Typography>
              <AttachMoneyIcon sx={{ color: "#e4a700" }} fontSize="large" />
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "30px",
                fontFamily: "Courier New",
                color:
                  status === "Not Started"
                    ? "#e4a700"
                    : status === "In Progress"
                    ? "green"
                    : "red",
              }}
            >
              {status}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {status !== "Completed" ? (
            <Tooltip title="Cancel Order">
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "red",
                    bgcolor: "black",
                  },
                }}
                onClick={() => {
                  deleteOrder();
                  handleOpenSnackbar();
                }}
              >
                <CancelIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : null}
          {status === "Completed" ? (
            <Tooltip title="Remove Comlpleted Order">
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "red",
                    bgcolor: "black",
                  },
                }}
                onClick={() => {
                  deleteOrder();
                }}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : null}
        </CardActions>
      </Box>
      {show && (
        <>
          <Typography variant="h5" sx={{ color: "white", margin: "1rem" }}>
            {description !== " " ? description : "No Extra Notes!"}
          </Typography>
        </>
      )}
    </Card>
  );
};

export default OrderCard;
