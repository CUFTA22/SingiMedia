import React from "react";
import {
  AppBar,
  Badge,
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
  MenuList,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import AdjustIcon from "@material-ui/icons/Adjust";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
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
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, logout } from "../../redux/user/userSlice";
import profileURL from "../../assets/user.svg";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1.1,
      left: -1.1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.5)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const StyledMenuItem = withStyles((theme) => ({}))(MenuItem);

const StyledMenu = withStyles({})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "24px",
    height: "24px",
  },
  appBarBottom: {
    position: "static",
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
      top: "auto",
      bottom: 0,
    },
  },
  forDesktop: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  forMobile: {
    [theme.breakpoints.up("sm")]: {
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.15),
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
  title: {
    cursor: "pointer",
  },
}));

const Header = ({ darkMode, setDarkMode }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [state, setState] = React.useState({ left: false });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openGC, setOpenGC] = React.useState(false);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
      <AppBar color="default" className={classes.appBarBottom}>
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
          <div className={classes.forDesktop}>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/">SingiMedia</Link>
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
          </div>

          <div className={classes.grow} />

          <div className={classes.forDesktop}>
            {isAuthenticated ? (
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  onClick={handleClickMenu}
                  src={profileURL}
                  alt={`SingiMedia profile avatar`}
                />
              </StyledBadge>
            ) : (
              <Link to="/signin">
                <Button color="primary" variant="contained">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className={classes.forMobile}>
            <Fab color="primary" aria-label="add" className={classes.fabButton}>
              <AddIcon />
            </Fab>
            {isAuthenticated ? (
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  onClick={handleClickMenu}
                  src={profileURL}
                  alt={`SingiMedia profile avatar`}
                />
              </StyledBadge>
            ) : (
              <Link to="/signin">
                <IconButton edge="end" color="inherit">
                  <PersonAddRoundedIcon />
                </IconButton>
              </Link>
            )}
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
              <ListItemText primary={"SingiMedia V1.0"} />
            </ListItem>

            <Divider />

            <ListItem onClick={() => history.push("/")} button>
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Home Page"} />
            </ListItem>

            <ListItem onClick={() => history.push("/")} button>
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>

            <ListItem onClick={() => history.push("/user")} button>
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

            <ListItem button>
              <ListItemIcon>
                <SchoolRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Start Learning"} />
            </ListItem>

            <Divider />

            {darkMode ? (
              <Tooltip title="Don't do this to yourself" arrow placement="left">
                <ListItem onClick={setDarkMode} button>
                  <ListItemIcon>
                    <WbSunnyRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Light Mode"} />
                </ListItem>
              </Tooltip>
            ) : (
              <ListItem onClick={setDarkMode} button>
                <ListItemIcon>
                  <Brightness2Icon />
                </ListItemIcon>
                <ListItemText primary={"Night Mode"} />
              </ListItem>
            )}

            <ListItem button>
              <ListItemIcon>
                <AdjustIcon />
              </ListItemIcon>
              <ListItemText primary={"Custom Cursor"} />
            </ListItem>

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

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            history.push("/user");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            dispatch(logout());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
