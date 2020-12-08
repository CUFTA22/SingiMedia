import React from "react";
import {
  AppBar,
  Button,
  Collapse,
  Divider,
  Drawer,
  Fab,
  fade,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import MouseRoundedIcon from "@material-ui/icons/MouseRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { ReactComponent as SingiLogo } from "../../assets/SingiLogo.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "24px",
    height: "24px",
  },
  appBarBottom: {
    top: "auto",
    bottom: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBarTop: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  list: {
    width: 250,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  sectionDesktop: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Header = ({ darkMode, setDarkMode }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const [openGC, setOpenGC] = React.useState(false);

  const handleOpenGC = () => {
    setOpenGC(!openGC);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <AppBar position="fixed" color="default" className={classes.appBarBottom}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit">
            <PersonAddRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <AppBar position="static" color="default" className={classes.appBarTop}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            SingiMedia
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button color="primary" variant="contained">
              Sign In
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <div
          className={classes.list}
          role="presentation"
          onKeyDown={toggleDrawer("left", false)}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <SingiLogo className={classes.logo} />
              </ListItemIcon>
              <ListItemText primary={"SingiMedia"} />
            </ListItem>

            <Divider />

            <ListItem button>
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Home Page"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"View Profile"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <AddRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Add a Post"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <EmojiEventsIcon />
              </ListItemIcon>
              <ListItemText primary={"Earn a Badge"} />
            </ListItem>

            <Divider />

            {darkMode ? (
              <ListItem onClick={setDarkMode} button>
                <ListItemIcon>
                  <WbSunnyRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"Light Mode"} />
              </ListItem>
            ) : (
              <ListItem onClick={setDarkMode} button>
                <ListItemIcon>
                  <Brightness2Icon />
                </ListItemIcon>
                <ListItemText primary={"Night Mode"} />
              </ListItem>
            )}

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
    </>
  );
};

export default Header;
