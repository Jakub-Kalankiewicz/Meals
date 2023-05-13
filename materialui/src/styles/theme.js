import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
      custom: 1200,
    },
  },
  components: {
    MuiContainer: {
      variants: [
        {
          props: { maxWidth: "xlg" },
          style: {
            padding: 0,
            paddingLeft: "30rem",
            paddingRight: "3rem",
            width: "100%",
            margin: 0,
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "login-auth" },
          style: {
            color: "#e4a700",
            "&:hover": {
              backgroundColor: "#323236",
            },
            "&:focus": {
              backgroundColor: "#323236",
            },
            backgroundColor: "black",
            margin: "1rem",
          },
        },
        {
          props: { variant: "home-order" },
          style: {
            color: "#e4a700",
            border: "1.5px solid #e4a700",
            borderRadius: "2rem",
            fontWeight: "700",
            fontFamily: "Courier New, Courier, monospace",
            "&:hover": {
              backgroundColor: "#e4a700",
              color: "black",
            },
            "&:active": {
              backgroundColor: "#e4a700",
              color: "black",
            },
            backgroundColor: "black",
            margin: "2rem 6rem",
            padding: "0.5rem 3rem",
          },
        },
        {
          props: { variant: "order" },
          style: {
            fontFamily: "Playfair Display",
            fontStyle: "italic",
            textTransform: "none",
            fontWeight: "700",
            color: "black",
            borderRadius: "20px",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:focus": {
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: { variant: "ourmenu" },
          style: {
            fontFamily: "Playfair Display",
            fontStyle: "italic",
            textTransform: "none",
            fontSize: "30px",
            color: "#e4a700",
            borderRadius: "20px",
            "&:hover": {
              backgroundImage: `linear-gradient(to top right,white 0%, #f0f0f0 100%)`,
            },
            "&:focus": {
              backgroundImage: `linear-gradient(to bottom right,white 0%, #f0f0f0 100%)`,
            },
            backgroundColor: "white",
            margin: "1rem",
          },
        },
        {
          props: { variant: "login-home" },
          style: {
            marginTop: "16px",
            marginBottom: "16px",
            marginRight: "20px",
            borderRadius: "20px",
            color: "#e4a700",
            backgroundColor: "black",
            padding: "0",
            height: "2.5rem",
            width: "9rem",
            textTransform: "none",
            fontSize: "25px",
            "&:hover": {
              color: "black",
              backgroundColor: "#e4a700",
            },
            "&:focus": {
              color: "black",
              backgroundColor: "#e4a700",
            },
          },
        },
        {
          props: { variant: "signup-home" },
          style: {
            marginTop: "16px",
            marginBottom: "16px",
            borderRadius: "20px",
            color: "black",
            backgroundColor: "#e4a700",
            padding: "0",
            height: "2.5rem",
            width: "9rem",
            textTransform: "none",
            fontSize: "25px",
            "&:hover": {
              color: "#e4a700",
              backgroundColor: "black",
            },
            "&:focus": {
              color: "#e4a700",
              backgroundColor: "black",
            },
          },
        },
        {
          props: { variant: "registernow-auth" },
          style: {
            backgroundColor: "white",
            "&:hover": {
              color: "#e4a700",
              backgroundColor: "white",
              boxShadow: "none",
            },
            "&:active": {
              color: "#e4a700",
              backgroundColor: "white",
              boxShadow: "none",
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&  .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
          "& label.Mui-focused": {
            color: "#e4a700",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiFilledInput-root.Mui-focused": {
            border: "2px solid #e4a700",
          },
        },
      },
    },
  },
});

export default theme;
