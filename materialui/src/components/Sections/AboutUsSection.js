import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import Carousel from "../Helpers/Carousel";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image1 from "../../assets/OurOffer/Meal.png";
import Image2 from "../../assets/OurOffer/meal3.png";
import Image3 from "../../assets/OurOffer/meal4.png";
import Image4 from "../../assets/OurOffer/meal5.png";
import Image5 from "../../assets/OurOffer/meal6.png";
import Pierogi from "../../assets/OurOffer/pierogi.png";
import Nalesniki from "../../assets/OurOffer/nalesniki.png";
import Pomidorowa from "../../assets/OurOffer/pomidorowa.png";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "../../styles/Contact.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import meal from "../../assets/AboutUs/meals3.png";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const labels = {
  0.5: "Disgusting",
  1: "Terrible",
  1.5: "Bad",
  2: "Poor",
  2.5: "Ok",
  3: "Nice",
  3.5: "Good",
  4: "Very Good",
  4.5: "Delicious",
  5: "Excellent",
};
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const AboutUsSection = () => {
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);
  const [show, setShow] = React.useState(false);
  const nav = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Carousel
          title="About Us"
          on={true}
          imageNumber="3"
          direction="bottom left"
          black={"40%"}
          gold={"60%"}
          shrink={true}
        />
        <Box
          sx={{
            display: { sm: "none" },
            backgroundImage: `url(${meal})`,
            width: "100%",
          }}
        >
          <Typography
            textAlign="center"
            fontFamily="Playfair Display"
            fontStyle="italic"
            sx={{
              marginTop: "5rem",
              backgroundClip: "text",
              color: "transparent",
              backgroundImage: `linear-gradient(to bottom left, black 30%, #e4a700 60%)`,
              fontSize: "90px",
              marginLeft: "1rem",
            }}
            className="main2"
          >
            About Us
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "auto" },
              margin: "auto",
              textAlign: { sm: "center" },
            }}
          >
            <img
              src="https://media.istockphoto.com/id/1134949751/vector/restaurant-staff-characters-design.jpg?s=612x612&w=0&k=20&c=Rx5uHMOIxQZiutyJ6ASZPho8FvBGVKHTTCGNxXhPQ-U="
              alt="team"
              style={{ width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "50%",
              textAlign: "center",
              marginTop: 0,
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Typography
              fontFamily="Playfair Display"
              fontStyle="italic"
              textAlign="center"
              sx={{
                backgroundClip: "text",
                color: "transparent",
                backgroundImage: `linear-gradient(to top,black 0%, #e4a700 50%)`,
                fontSize: { xs: "70px", sm: "100px", md: "120px", xl: "130px" },
                "@media (min-width:1200px)": {
                  fontSize: "100px",
                },
              }}
            >
              Our History
            </Typography>
            <Typography
              sx={{
                margin: "auto",
                width: "80%",
                fontSize: { xs: "16px", sm: "24px" },
                color: "grey",
              }}
              textAlign="center"
            >
              We are a small, local canteen that has been serving food for over
              100 years. Our team welcome guests with a smile and always
              delicious food. Meal's chef prepares all meals himself and
              guarantees that he will pour his whole heart into all of them.
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            margin: "4rem 0",
            backgroundColor: "#e4a700",
            width: "100%",
            height: "7px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "4rem",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column" },
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Typography
              fontFamily="Playfair Display"
              fontStyle="italic"
              textAlign="center"
              sx={{
                backgroundClip: "text",
                color: "transparent",
                backgroundImage: `linear-gradient(to bottom,black 30%, #e4a700 50%)`,
                fontSize: { xs: "70px", sm: "100px", md: "130px" },
              }}
            >
              Our Offer
            </Typography>
            <Typography
              sx={{
                margin: "auto",
                width: "80%",
                fontSize: { xs: "16px", sm: "24px" },
                color: "grey",
              }}
              textAlign="center"
            >
              Our menu is full of homemade delicious dishes. Here you will find
              many traditional soups and main dishes, but also delicious
              breakfasts and desserts. And for the thirsty we have a wide range
              of drinks.
            </Typography>
            <Button
              variant="ourmenu"
              onClick={() => nav("/menu")}
              sx={{ margin: "auto" }}
            >
              Check out our full menu!
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              margin: "auto",
            }}
          >
            <ImageList
              sx={{
                width: "90%",
                height: "40vh",
                marginTop: { xs: "1rem", md: "3rem" },
              }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {itemData.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
        <Divider
          sx={{
            margin: "4rem 0 3rem 0",
            backgroundColor: "#e4a700",
            width: "100%",
            height: "7px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "4rem",
            gap: "1rem",
          }}
        >
          <Typography
            fontFamily="Playfair Display"
            fontStyle="italic"
            textAlign="center"
            sx={{
              backgroundClip: "text",
              color: "transparent",
              backgroundImage: `linear-gradient(to bottom,black 0%, #e4a700 50%)`,
              fontSize: { xs: "30px", sm: "50px", md: "90px" },
            }}
          >
            Leave us your feedback
          </Typography>
          <Typography
            sx={{
              margin: "auto",
              width: "80%",
              fontSize: { xs: "16px", sm: "24px" },
              color: "grey",
            }}
            textAlign="center"
          >
            We try to take the opinions of our customers to heart and always
            apply them with all our strength. So please leave positive feedback.
          </Typography>
          <Typography></Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
            }}
          >
            <StyledRating
              name="customized-color"
              defaultValue={4}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              onClick={() => setShow(true)}
              sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}
            />
            {value !== null && (
              <Box sx={{ ml: { xs: "0", sm: "2rem" } }}>
                {labels[hover !== -1 ? hover : value]}
              </Box>
            )}
          </Box>
          {show && (
            <Typography
              textAlign="center"
              marginTop="1rem"
              marginBottom="2rem"
              fontFamily="Playfair Display"
              fontStyle="italic"
              sx={{
                margin: "auto",
                width: "80%",
                fontSize: { xs: "16px", sm: "24px" },
              }}
            >
              We are truly grateful for your feedback.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: Image1,
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    img: Image2,
    title: "Hats",
    cols: 2,
  },
  {
    img: Pierogi,
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: Image3,
    title: "Basketball",
  },
  {
    img: Image4,
    title: "Fern",
  },
  {
    img: Nalesniki,
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: Image5,
    title: "Sea star",
  },
  {
    img: Pomidorowa,
    title: "Bike",
    cols: 2,
  },
];

export default AboutUsSection;
