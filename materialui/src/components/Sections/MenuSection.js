import Carousel from "../Helpers/Carousel";
import { useLazyQuery, useQuery } from "@apollo/client"; // Import the useLazyQuery hook
import { GET_MENUS, GET_MENU } from "../../queries/menuQueries";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import meal from "../../assets/AboutUs/meals3.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const MenuSection = () => {
  const { data: dataMenus } = useQuery(GET_MENUS);
  const [getMenu, { data: dataMenu }] = useLazyQuery(GET_MENU);

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleMenu = (option, index) => {
    getMenu({ variables: { name: option } });
    setCurrentIndex(index);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    async function fetchMenu() {
      await getMenu({ variables: { name: "Main dish" } });
      // handle the response
    }
    fetchMenu();
  }, [getMenu]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom:"4rem"
        }}
      >
        <Carousel
          title="Menu"
          on={true}
          imageNumber="3"
          direction="bottom left"
          black={"40%"}
          gold={"60%"}
          height={"8000px"}
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
              fontSize: "150px",
            }}
            className="main2"
          >
            Menu
          </Typography>
        </Box>
        {dataMenus && (
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: { xs: "block", sm: "none" },
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable auto tabs example"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& .css-1aquho2-MuiTabs-indicator": {
                    backgroundColor: "#e4a700",
                  },
                }}
              >
                {dataMenus &&
                  dataMenus.menus.map((menu, index) => (
                    <Tab
                      key={menu.name}
                      sx={{
                        variant: "h1",
                        textAlign: "center",
                        fontFamily: "Playfair Display",
                        fontStyle: "italic",
                        "&.Mui-selected": {
                          color: "#e4a700",
                        },
                        fontSize: "23px",
                        margin: "2rem 2rem 2rem 0",
                        textTransform: "none",
                      }}
                      label={menu.name}
                      {...a11yProps(0)}
                      onClick={() => handleMenu(menu.name, index)}
                    />
                  ))}
              </Tabs>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  marginTop: "1rem",
                  borderRight: 1,
                  borderColor: "divider",
                  // minWidth: "232px",
                  width: { sm: "190px", md: "230px", lg: "270px", xl: "300px" },
                  "& .css-10d9dml-MuiTabs-indicator": {
                    backgroundColor: "#e4a700",
                  },
                }}
                scrollButtons="auto" // set scrollButtons to auto
              >
                {dataMenus &&
                  dataMenus.menus.map((menu, index) => (
                    <Tab
                      key={menu.name}
                      sx={{
                        variant: "h1",
                        textAlign: "center",
                        fontFamily: "Playfair Display",
                        fontStyle: "italic",
                        "&.Mui-selected": {
                          color: "#e4a700",
                        },
                        fontSize: {
                          sm: "20px",
                          md: "26px",
                          lg: "30px",
                          xl: "32px",
                        },
                        margin: "2rem",
                        textTransform: "none",
                      }}
                      label={menu.name}
                      {...a11yProps(0)}
                      onClick={() => handleMenu(menu.name, index)}
                    />
                  ))}
              </Tabs>
            </Box>
            {dataMenus &&
              dataMenus.menus.map((menu, index) => (
                <TabPanel
                  key={index}
                  value={value}
                  index={index}
                  style={{ width: "100%", height: "100%" }}
                >
                  {dataMenu && dataMenu.menu && currentIndex === index && (
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      width="100%"
                      height="100%"
                    >
                      {dataMenu.menu.dishes.map((dish, index) => (
                        <Box style={{ margin: "2rem 0" }} key={index}>
                          <Typography
                            variant="h5"
                            fontFamily="Playfair Display"
                          >
                            {dish.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight="400"
                            fontFamily="Playfair Display"
                          >
                            {dish.description}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </TabPanel>
              ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default MenuSection;
