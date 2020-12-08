import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    borderRadius: 0,
  },
}));

const HomePage = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      Hello World
    </Paper>
  );
};

export default HomePage;
