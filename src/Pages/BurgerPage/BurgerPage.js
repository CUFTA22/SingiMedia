import { makeStyles } from "@material-ui/core";
import React from "react";
import BurgerCreator from "./BurgerCreator";
import BurgerDisplay from "./BurgerDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "90px auto 0",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      paddingBottom: 60,
    },
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
