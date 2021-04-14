import React from "react";
import MouseRoundedIcon from "@material-ui/icons/MouseRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import CasinoIcon from "@material-ui/icons/Casino";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PublicIcon from "@material-ui/icons/Public";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import { ReactComponent as SingiLogo } from "../../assets/SingiLogo.svg";
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../../redux/utils/utilsSlice";
import {
  logout,
  selectIsAdmin,
  selectIsAuthenticated,
} from "../../redux/user/userSlice";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  logo: {
    width: "24px",
    height: "24px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  forDesktop: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const DrawerComp = ({ toggleDrawer, state }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const isAdmin = useSelector(selectIsAdmin);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [openGC, setOpenGC] = React.useState(false);

  const handleOpenGC = () => {
    setOpenGC(!openGC);
  };

  return (
    <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
      <div className={classes.list} role="presentation">
        <List>
          <ListItem>
            <ListItemIcon>
              <SingiLogo className={classes.logo} />
            </ListItemIcon>
            <ListItemText primary={"Singi Media"} />
          </ListItem>

          <Divider />
          <ListItem onClick={() => history.push("/")} button>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Home Page"} />
          </ListItem>

          {isAdmin ? (
            <ListItem onClick={() => history.push("/")} button>
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          ) : null}

          {isAuthenticated ? (
            <ListItem
              onClick={() => history.push("/add-post")}
              className={classes.forDesktop}
              button
            >
              <ListItemIcon>
                <AddRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Add a Post"} />
            </ListItem>
          ) : null}

          {isAuthenticated ? (
            <ListItem onClick={() => history.push("/testus")} button>
              <ListItemIcon>
                <EmojiEventsIcon />
              </ListItemIcon>
              <ListItemText primary={"Earn a Badge"} />
            </ListItem>
          ) : null}

          <ListItem onClick={() => history.push("/learn")} button>
            <ListItemIcon>
              <SchoolRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Start Learning"} />
          </ListItem>

          <ListItem onClick={() => history.push("/webGL")} button>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary={"WebGL Demo"} />
          </ListItem>

          <ListItem onClick={() => history.push("/burger")} button>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary={"Burger Builder"} />
          </ListItem>

          <ListItem onClick={() => history.push("/casino")} button>
            <ListItemIcon>
              <CasinoIcon />
            </ListItemIcon>
            <ListItemText primary={"Casino"} />
          </ListItem>

          <Divider />
          {darkMode ? (
            <Tooltip title="Don't do this to yourself" arrow placement="left">
              <ListItem onClick={() => dispatch(toggleDarkMode())} button>
                <ListItemIcon>
                  <WbSunnyRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Light Mode"} />
              </ListItem>
            </Tooltip>
          ) : (
            <ListItem onClick={() => dispatch(toggleDarkMode())} button>
              <ListItemIcon>
                <Brightness2Icon />
              </ListItemIcon>
              <ListItemText primary={"Night Mode"} />
            </ListItem>
          )}

          {isAuthenticated ? (
            <ListItem onClick={() => dispatch(logout())} button>
              <ListItemIcon>
                <ExitToAppRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItem>
          ) : null}

          <ListItem button onClick={handleOpenGC}>
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary={"Game Center"} />
            {openGC ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openGC} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AppsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="ReacTacToe" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <MouseRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="React Clicker" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerComp;
