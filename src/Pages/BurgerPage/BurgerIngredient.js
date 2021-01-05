import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  sauce: {
    height: 10,
    width: "78%",
    background:
      "linear-gradient(49deg, rgba(255,0,0,1) 0%, rgba(173,0,0,1) 50%, rgba(255,0,0,1) 100%)",
    borderRadius: 20,
  },
  salad: {
    height: 20,
    width: "85%",
    background:
      "linear-gradient(49deg, rgba(56,255,24,1) 0%, rgba(30,160,20,1) 50%, rgba(191,255,134,1) 100%)",
    borderRadius: 10,
    margin: "2px 0",
  },
  cheese: {
    height: 10,
    width: "85%",
    background: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)",
  },
  meat: {
    height: 25,
    width: "90%",
    borderRadius: 10,
    margin: "2px 0",
    background: "linear-gradient(315deg, #69140e 0%, #d58936 74%)",
  },
  bacon: {
    height: 15,
    width: "85%",
    borderRadius: 50,
    margin: "2px 0",
    background:
      "radial-gradient(circle, rgba(209,209,160,1) 0%, rgba(122,30,14,1) 100%)",
  },
}));

const BurgerIngredient = ({ type }) => {
  const classes = useStyles();
  return <div className={classes[`${type}`]}></div>;
};

export default BurgerIngredient;
