import { makeStyles } from "@material-ui/core";
import React from "react";
import BurgerCreator from "./BurgerCreator";
import BurgerDisplay from "./BurgerDisplay";

const useStyles = makeStyles(() => ({
  root: {
    margin: "90px auto 0",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

const BurgerPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BurgerCreator />
      <BurgerDisplay />
    </div>
  );
};

export default BurgerPage;
