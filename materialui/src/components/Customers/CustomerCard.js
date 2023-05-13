import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import FaceIcon from "@mui/icons-material/Face";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { GET_USER } from "../../queries/usersQueries";
import { useQuery } from "@apollo/client";

const CustomerCard = ({ userId }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { id: userId },
    alias: "getUser",
  });
  return (
    <Card
      sx={{
        margin: { xs: "1rem 0 0 0", md: "2rem 0 0 1rem" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "black",
        borderRadius: "1rem",
        ".css-veu73a-MuiCardContent-root": {
          padding: "0 0 2rem",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            color: "white",
            display: "flex",
            gap: "2rem",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box
            sx={{
              color: "white",
              display: "flex",
              gap: "2rem",
              alignItems: { xs: "center", md: "flex-start" },
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
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
                <FaceIcon sx={{ color: "#e4a700" }} fontSize="large" />
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontFamily: "Courier New",
                  }}
                >
                  Username
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "25px",
                  fontFamily: "Courier New",
                  color: "#e4a700",
                }}
              >
                {!loading && data && data.user.name}
                {loading && "Loading..."}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
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
                <EmailIcon sx={{ color: "#e4a700" }} fontSize="large" />
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontFamily: "Courier New",
                  }}
                >
                  Email
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "20px", sm: "25px" },
                  fontFamily: "Courier New",
                  color: "#e4a700",
                }}
              >
                {!loading && data && data.user.email}
                {loading && "Loading..."}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
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
                <PhoneIphoneIcon sx={{ color: "#e4a700" }} fontSize="large" />
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontFamily: "Courier New",
                  }}
                >
                  Phone
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "25px",
                  fontFamily: "Courier New",
                  color: "#e4a700",
                }}
              >
                {!loading && data && data.user.phone}
                {loading && "Loading..."}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CustomerCard;
