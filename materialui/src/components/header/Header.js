import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../context/auth-context";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderDrawer from "./HeaderDrawer";
import Logout from "@mui/icons-material/Logout";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import GroupsIcon from "@mui/icons-material/Groups";
import { GET_USER } from "../../queries/usersQueries";
import { useLazyQuery } from "@apollo/client";
import "../../styles/Contact.css";

const paperProps = {
  elevation: 0,
  sx: {
    backgroundColor: "#e4a700",
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "black",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const Header = () => {
  const loc = useLocation();
  const [activeItem, setActiveItem] = useState(
    loc.pathname === "/aboutus"
      ? "About"
      : loc.pathname === "/menu"
      ? "Menu"
      : loc.pathname === "/contact"
      ? "Contact"
      : null
  );

  useEffect(() => {
    setActiveItem(
      loc.pathname === "/aboutus"
        ? "About"
        : loc.pathname === "/menu"
        ? "Menu"
        : loc.pathname === "/contact"
        ? "Contact"
        : null
    );
  }, [loc.pathname]);
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const handleDrawerClick = (option) => {
    if (option === "Menu") {
      nav("/menu");
    } else if (option === "Contact") {
      nav("/contact");
    } else if (option === "About") {
      nav("/aboutus");
    }
  };
  const authContext = useContext(AuthContext);
  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      authContext.setUser(data.user.name);
    },
    alias: "getUser",
  });
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (authContext.token) getUser({ variables: { id: authContext.userId } });
  }, [authContext, getUser]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOrder = () => {
    handleClose();
    nav("/orders");
  };
  const handleAccount = () => {
    handleClose();
    nav("/customers");
  };
  const handleLogout = () => {
    nav("/");
    handleClose();
    authContext.logout();
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          backgroundColor: "black",
          paddingLeft: "1px",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", sm: "space-evenly" },
            marginLeft: { xs: "1rem", sm: "0" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: "0", md: "2rem" },
            }}
          >
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                sx={{ marginRight: "2rem" }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon
                  sx={{
                    color: "#e4a700",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#eacb4c",
                      fontSize: "2rem",
                      padding: "12px 24px",
                    },
                  }}
                />
              </IconButton>
              <HeaderDrawer state={state} toggleDrawer={toggleDrawer} />
            </Box>
            <Typography
              variant="h2"
              color="#e4a700"
              onClick={() => nav("/")}
              sx={{
                transition: "all 0.3s ease",
                backgroundClip: "text",
                color: "transparent",
                "&:hover": {
                  color: { lg: "#e4a700" },
                  fontSize: { lg: "3rem" },
                  padding: { lg: "12px 24px" },
                  cursor: { lg: "pointer" },
                },
              }}
              className="main-text"
            >
              Meals
            </Typography>
            <Box
              sx={{ display: { xs: "none", md: "flex", flexDirection: "row" } }}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {["About", "Menu", "Contact"].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => handleDrawerClick(text)}>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: "20px",
                        }}
                        sx={{
                          fontStyle: "italic",
                          color: activeItem === text ? "#e4a700" : "#f6e7b1",
                          borderBottom:
                            activeItem === text ? "1px solid #e4a700" : "none",
                          "&:hover": {
                            borderBottom: "1px solid #e4a700",
                            color: "#e4a700",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          {!authContext.token && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                fontFamily="Playfair Display"
                fontStyle="italic"
                variant="login-home"
                onClick={() => nav("/auth/signin")}
                sx={{ border: "1px solid #e4a700" }}
              >
                Log in
              </Button>
              <Button
                fontFamily="Playfair Display"
                fontStyle="italic"
                variant="signup-home"
                onClick={() => nav("/auth/signup")}
                sx={{ border: "1px solid #e4a700" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
          {authContext.token && (
            <Box>
              <Tooltip title="Account settings">
                <IconButton
                  sx={{ marginTop: "6px", padding: 0 }}
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{
                      textAlign: "center",
                      fontSize: "50px",
                      margin: "0 10px 0",
                      height: "60px",
                      width: "60px",
                      backgroundColor: "#e4a700",
                      color: "black",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#eacb4c",
                        fontSize: "2rem",
                      },
                    }}
                  >
                    {authContext.userName.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={paperProps}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={handleOrder}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <FastfoodIcon
                    sx={{ fontSize: "30px", marginRight: "10px" }}
                  />
                  <Typography paddingRight="2px">My orders</Typography>
                </MenuItem>
                {authContext.userId === process.env.REACT_APP_ADMIN_ID && (
                  <MenuItem
                    onClick={handleAccount}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <GroupsIcon
                      sx={{ fontSize: "30px", marginRight: "10px" }}
                    />
                    <Typography paddingRight="2px">Customers</Typography>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </AppBar>
    </>
  );
};

export default Header;
