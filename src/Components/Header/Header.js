import React from "react";
import {
  AppBar,
  Badge,
  Button,
  CircularProgress,
  Fab,
  fade,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserIsLoading,
  selectUser,
} from "../../redux/user/userSlice";
import DrawerComp from "../DrawerComp/DrawerComp";

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

const useStyles = makeStyles((theme) => ({
  cp: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  appBarBottom: {
    position: "fixed",
    width: "100%",
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
  title: {
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userIsLoading = useSelector(selectUserIsLoading);
  const userInfo = useSelector(selectUser);
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <>
      <AppBar color="default" className={classes.appBarBottom}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
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
            {userIsLoading ? (
              <CircularProgress size="30px" />
            ) : isAuthenticated ? (
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  className={classes.cp}
                  onClick={() => {
                    history.push(`/user/${userInfo?.displayName}`);
                  }}
                  src={
                    require(`../../assets/avatars/${userInfo.avatar}.svg`)
                      .default
                  }
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
            <Fab
              onClick={() => history.push("/add-post")}
              color="primary"
              aria-label="add"
              className={classes.fabButton}
            >
              <AddIcon />
            </Fab>
            {userIsLoading ? (
              <CircularProgress size="30px" />
            ) : isAuthenticated ? (
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  onClick={() => {
                    history.push(`/user/${userInfo.displayName}`);
                  }}
                  src={
                    userInfo
                      ? require(`../../assets/avatars/${userInfo.avatar}.svg`)
                          .default
                      : ""
                  }
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

      <DrawerComp toggleDrawer={toggleDrawer} state={state} />
    </>
  );
};

export default Header;
