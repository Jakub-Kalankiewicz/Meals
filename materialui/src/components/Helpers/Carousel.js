import React, { useState, useEffect } from "react";
import Image1 from "../../assets/AboutUs/meal5.png";
import Image2 from "../../assets/AboutUs/meal1.png";
import Image3 from "../../assets/AboutUs/meal2.png";
import Image4 from "../../assets/AboutUs/meals3.png";
import "./Carousel.css";
import { Box, Typography } from "@mui/material";

const Carousel = ({
  title,
  on,
  shrink,
  direction,
  addClasses,
  black,
  gold,
}) => {
  const images = [Image1, Image2, Image3, Image4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % 4;
      setCurrentIndex(nextIndex);
    }, 9000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <Box
      className={"slider"}
      sx={{
        height: { sm: "350px", md: "400px", lg: "450px", xl: "500px" },
        display: { xs: "none", sm: "block" },
      }}
    >
      {!shrink && (
        <Typography
          variant="h1"
          textAlign="center"
          fontFamily="Playfair Display"
          fontStyle="italic"
          sx={{
            position: "relative",
            marginTop: { sm: "8rem", lg: "6rem" },
            fontSize: { sm: "160px", md: "250px", lg: "300px", xl: "350px" },
            zIndex: 2,
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: `linear-gradient(to ${direction},black ${
              black ? black : "40%"
            }, #e4a700 ${gold ? gold : "100%"})`,
          }}
        >
          {title}
        </Typography>
      )}
      {shrink && (
        <Typography
          variant="h1"
          textAlign="center"
          fontFamily="Playfair Display"
          fontStyle="italic"
          sx={{
            position: "relative",
            marginTop: { sm: "8rem", lg: "6rem" },
            fontSize: { sm: "160px", md: "250px", lg: "300px", xl: "350px" },
            zIndex: 2,
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: `linear-gradient(to ${direction},black ${
              black ? black : "40%"
            }, #e4a700 ${gold ? gold : "100%"})`,
          }}
        >
          {title}
        </Typography>
      )}
      {on &&
        images.map((image, index) => (
          <img
            key={image}
            src={image}
            style={{ zIndex: 1 }}
            alt={`Slide ${index}`}
            className={
              index === currentIndex ? `active ${addClasses}` : `${addClasses}`
            }
          />
        ))}
    </Box>
  );
};

export default Carousel;
