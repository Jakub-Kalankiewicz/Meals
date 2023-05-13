import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from "../../context/auth-context";

const HeaderDrawer = ({ state, toggleDrawer }) => {
  const authContext = useContext(AuthContext);
  const nav = useNavigate();
  const handleDrawerClick = (option) => {
    if (option === "Menu") {
      nav("/menu");
    } else if (option === "Contact") {
      nav("/contact");
    } else if (option === "About Us") {
      nav("/aboutus");
    } else if (option === "Log In") {
      nav("/auth/signin");
    } else if (option === "Sign Up") {
      nav("/auth/signup");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 260,
        backgroundColor: "black",
        height: "100%",
        color: "#e4a700",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {!authContext.token && (
        <div>
          <List sx={{ display: { xs: "block", sm: "none" } }}>
            {["Log In", "Sign Up"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleDrawerClick(text)}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <LoginIcon sx={{ color: "#e4a700" }} />
                    ) : (
                      <AssignmentIndIcon sx={{ color: "#e4a700" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: "#e4a700" }} />
        </div>
      )}

      <List>
        {["About Us", "Menu", "Contact"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDrawerClick(text)}>
              <ListItemIcon>
                {index === 0 ? (
                  <InfoIcon sx={{ color: "#e4a700" }} />
                ) : index === 1 ? (
                  <TakeoutDiningIcon sx={{ color: "#e4a700" }} />
                ) : (
                  <ContactSupportIcon sx={{ color: "#e4a700" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
      {list("left")}
    </Drawer>
  );
};

export default HeaderDrawer;
