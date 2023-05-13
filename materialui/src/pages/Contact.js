import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import GoogleMap from "../components/Maps/GoogleMap";
import "../styles/Contact.css";

const Contact = () => {
  const location = { lat: 52.231937003595945, lng: 21.0063461882895 };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          height: { md: "100vh" },
          width: "100%",
          maxHeight: { md: "100vh" },
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingTop: { xs: "100px", md: "0" },
          gap: { xs: "3rem", md: "0" },
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexBasis: "40%",
          }}
        >
          <Box
            className="main"
            sx={{
              width: "100%",
              height: "60%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              borderRadius: "5rem",
              padding: { xs: "2.3rem", sm: "2rem 4rem 4rem 4rem" },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Typography
                sx={{
                  color: "gray",
                  textAlign: "center",
                  fontSize: {
                    xs: "clamp(7px,3vw,20px)",
                    md: "clamp(12px, 1vw, 18px)",
                  },
                }}
              >
                If you have any question feel free to let us know
              </Typography>
              <Typography
                fontFamily="Playfair Display"
                fontStyle="italic"
                sx={{
                  fontSize: {
                    xs: "clamp(50px,14vw,100px)",
                    md: "clamp(50px, 5vw, 100px)",
                  },
                  color: "#e4a700",
                  textAlign: "center",
                }}
              >
                Contact Us
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                marginTop: { sm: "1rem" },
              }}
              component="form"
            >
              <TextField
                id="name"
                type="text"
                label="Name"
                autoFocus={true}
                variant="filled"
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& .MuiFilledInput-root": {
                    borderRadius: "1.5rem",
                    "&:hover": {
                      border: "1.5px solid #e4a700",
                    },
                  },
                }}
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="filled"
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& .MuiFilledInput-root": {
                    borderRadius: "1.5rem",
                    "&:hover": {
                      border: "1.5px solid #e4a700",
                    },
                  },
                }}
              />

              <TextField
                id="message"
                type="text"
                label="Your message"
                variant="filled"
                multiline
                rows={3}
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& .MuiFilledInput-root": {
                    borderRadius: "1.5rem",
                    "&:hover": {
                      border: "1.5px solid #e4a700",
                    },
                  },
                  marginBottom: "1.5rem",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
            width: "90%",
            flexBasis: "35%",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(20px,15vw,40px)",
                md: "clamp(30px, 3vw, 40px)",
              },
              color: "#e4a700",
              textAlign: "center",
            }}
            fontFamily="Playfair Display"
            fontStyle="italic"
          >
            You can find us{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.pl/maps/place/plac+Defilad+1,+00-901+Warszawa/@52.2319896,21.0041468,17z/data=!3m1!4b1!4m6!3m5!1s0x471ecc8c92692e49:0x33f0e5becb0a7a8e!8m2!3d52.2319896!4d21.0067217!16s%2Fg%2F11c255nyylń"
              style={{ textDecorationColor: "#9f7502", color: "#9f7502" }}
            >
              here!
            </a>
          </Typography>
          <Box sx={{ width: "100%" }}>
            <GoogleMap lat={location.lat} lng={location.lng} />
          </Box>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(20px,15vw,40px)",
                md: "clamp(30px, 3vw, 40px)",
              },
              color: "#e4a700",
              textAlign: "center",
            }}
            fontFamily="Playfair Display"
            fontStyle="italic"
          >
            Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: { xs: "2rem", md: "0" },
            }}
          >
            <Typography fontWeight="700" sx={{ fontSize: "20px" }}>
              Meals
            </Typography>
            <Typography sx={{ color: "grey" }}>plac Defilad 1</Typography>
            <Typography sx={{ color: "grey" }}>00-901 Warszawa</Typography>
            <Typography sx={{ color: "grey" }}>Tel. +48 226 567 600</Typography>
            <Typography sx={{ color: "grey" }}>meals@gmail.com</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
