import "./topbar.css";
import { IconButton, styled, Typography, Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import {useStore} from "../../store";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar = ({ open, handleDrawerOpen }) => {
  const navigate = useNavigate();
  const { logout} = useStore((state) => ({
    logout: state.logout,
  }))

  const handleLogout = () => {
    logout()
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      // @ts-ignore
      open={open}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin-Dashboard
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleLogout}
            sx={{
              color: "white",
              backgroundColor: "red",
              textTransform: "none",
              borderRadius: "8px",
              padding: "5px 15px",
              boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
