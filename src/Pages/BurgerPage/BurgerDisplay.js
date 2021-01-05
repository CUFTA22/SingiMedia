import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    margin: "100px auto 50px",
    width: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    margin: "10px 0",
  },
  bun: {
    backgroundColor: "yellow",
    width: "70%",
    height: 30,
  },
}));

const BurgerDisplay = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.bun} />
      <Typography className={classes.text} color="textPrimary" variant="h6">
        {" "}
        Please start adding ingredients!
      </Typography>
      <div className={classes.bun} />
    </div>
  );
};

export default BurgerDisplay;
