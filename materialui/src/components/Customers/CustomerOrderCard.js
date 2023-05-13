import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import React, { useContext, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CustomerCard from "./CustomerCard";
import { DELETE_ORDER } from "../../mutations/orderMutations";
import { useMutation } from "@apollo/client";
import { GET_USER_ORDERS } from "../../queries/usersQueries";
import { AuthContext } from "../../context/auth-context";
import { GET_ORDERS } from "../../queries/orderQueries";

const CustomerOrderCard = ({
  id,
  description,
  amount,
  quantity,
  user,
  handleOpenSnackbar,
}) => {
  const authContext = useContext(AuthContext);
  const [hovered, setHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    variables: { id: id },
    refetchQueries: [
      { query: GET_USER_ORDERS, variables: { id: authContext.userId } },
      { query: GET_ORDERS },
    ],
  });
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: { xs: "280px", sm: "350px", md: "800px", lg: "1000px" },
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
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            color: "white",
            display: "flex",
            gap: "2rem",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              color: "white",
              display: "flex",
              gap: "2rem",
              justifyContent: "space-between",
              alignItems: "center",
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
              <Typography sx={{ fontSize: "30px", color: "white" }}>
                {quantity}
              </Typography>
              <PeopleAltSharpIcon fontSize="large" sx={{ color: "#e4a700" }} />
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
          </Box>
          <Typography
            onClick={() => {
              setShowDescription(!showDescription);
            }}
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontFamily: "Courier New",
              ":hover": {
                color: "#e4a700",
                cursor: "pointer",
              },
            }}
          >
            See extra notes
          </Typography>
          <Typography
            onClick={() => {
              setShowUser(!showUser);
            }}
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontFamily: "Courier New",
              ":hover": {
                color: "#e4a700",
                cursor: "pointer",
              },
            }}
          >
            See more user details
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              deleteOrder();
              handleOpenSnackbar();
            }}
          >
            {hovered ? (
              <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />
            ) : (
              <CheckCircleOutlineIcon
                fontSize="large"
                sx={{ color: "white" }}
              />
            )}
          </IconButton>
        </CardActions>
      </Box>
      {showDescription && (
        <>
          <Typography variant="h5" sx={{ color: "white", margin: "1rem" }}>
            {description !== " " ? description : "No Extra Notes!"}
          </Typography>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          width: "100%",
        }}
      >
        {showUser && <CustomerCard userId={user.id} />}
      </Box>
    </Card>
  );
};

export default CustomerOrderCard;
