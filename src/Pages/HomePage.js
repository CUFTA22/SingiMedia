import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    borderRadius: 0,
    padding: "80px 10px 0 10px",
    [theme.breakpoints.down("xs")]: {
      padding: "0 10px 80px 10px",
    },
  },
}));

const HomePage = (props) => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      Hello World
    </Paper>
  );
};

export default HomePage;
