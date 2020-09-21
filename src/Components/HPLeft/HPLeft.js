import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./HPLeft.scss";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { UserContext } from "../../Providers/UserProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "20px 0",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const HPLeft = (props) => {
  const classes = useStyles();

  const user = useContext(UserContext);
  let displayName, photoURL;
  if (user) {
    displayName = user.displayName;
    photoURL = user.photoURL;
  }

  const { rank, firstName, lastName } = props.props;

  const handleSearch = (e) => {
    e.preventDefault();

    alert("Search kinda sus");
  };

  return (
    <div className="hpleft">
      <div className="hpleft-top">
        <Avatar
          alt={firstName + " " + lastName + "'s profile avatar"}
          src={photoURL}
          className={classes.large}
        />
        <div className="hpleft-name">
          <h3>{displayName}</h3>
          <p>{rank}</p>
        </div>
      </div>
      <div className="hpleft-search">
        <Paper elevation={3} component="form" className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="Search Posts"
            inputProps={{ "aria-label": "search posts" }}
          />
          <IconButton
            onClick={handleSearch}
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="hpleft-bottom">
        <Fab color="primary" onClick={() => alert("W.I.P")} size="medium">
          <HelpOutlineOutlinedIcon className={classes.margin} />
        </Fab>
        <Fab
          color="primary"
          className="ig-grad"
          onClick={() => alert("Dugme kinda sus")}
          size="medium"
        >
          <InstagramIcon className={classes.margin} />
        </Fab>
        <Fab
          color="primary"
          className="github-grad"
          onClick={() => alert("U shall not see the code")}
          size="medium"
        >
          <GitHubIcon className={classes.margin} />
        </Fab>
        <Fab
          size="medium"
          color="primary"
          onClick={() => alert("Nemas prijatelje")}
        >
          <PeopleAltRoundedIcon className={classes.margin} />
        </Fab>
      </div>
    </div>
  );
};

export default HPLeft;
