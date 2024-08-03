import React, { useEffect, useState } from "react";
import { Avatar, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, styled, Typography, useTheme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { deepOrange } from "@mui/material/colors";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { jwtDecode } from "jwt-decode";


const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(
  // @ts-ignore
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const [username, setUsername] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
      try {
        setUsername(jwtDecode(token).username)
      } catch (error) {
        console.error("Invalid token", error);
    }
  } , [token])


  const menuItems = [
    { text: "المواد", icon: <ArticleIcon sx={{color:"#007ACC"}} />, path: "/category" },
    { text: "المحاضرات", icon: <CardMembershipIcon sx={{color:"#1976D2"}} />, path: "/subcategory" },
    { text: "فرص التدريب", icon: <ModelTrainingIcon sx={{color:"red"}} />, path: "/training" },
    { text: "خدمه الاشعارات", icon: <NotificationsActiveIcon sx={{color:"#eb9824"}} />, path: "/notice" },
  ];
  const menuItems2 = [
    { text: "اضافه ماده", icon: <AddTaskIcon sx={{color:"#0e9a59"}} />, path: "/create-new-category" },
    { text: "اضافه محاضره", icon: <AddCircleOutlineIcon sx={{color:"#0e9a59"}} />, path: "/create-new-subcategory" },
    { text: "اضافه فرصه", icon: <AddAlarmIcon sx={{color:"#0e9a59"}} />, path: "/create-new-training" },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      
      <Avatar
        sx={{
          bgcolor: deepOrange[500],
          mx: "auto",
          width: open ? 80 : 45,
          height: open ? 80 : 45,
          transition: "0.25s",
          my: 2,
        }}
      >
        {username ? username.charAt(0).toUpperCase() : "A"}
      </Avatar>
      
      <Typography
        align="center"
        sx={{
          fontSize: open ? 17 : 0,
          transition: "0.25s",
          fontFamily: "Almarai",
        }}
      >
        {username}
      </Typography>

      <Typography
        align="center"
        sx={{
          fontSize: open ? 17 : 0,
          transition: "0.25s",
          color: theme.palette.info.main,
          fontWeight: 600,
          mb: 1,
        }}
      >
        Admin
      </Typography>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Typography
                sx={{ fontFamily: "Almarai", fontSize: open ? 17 : 0 }}
              >
                {item.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <Divider />

      <List>
        {menuItems2.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Typography
                sx={{ fontFamily: "Almarai", fontSize: open ? 17 : 0 }}
              >
                {item.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Drawer>
  );
};

export default Sidebar;
