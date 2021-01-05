import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../redux/burger/burgerSlice";
import BurgerIngredient from "./BurgerIngredient";

const useStyles = makeStyles(() => ({
  root: {
    margin: "20px auto 50px",
    width: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: "10px 0",
  },
  bunTop: {
    height: 100,
    width: "80%",
    background: "linear-gradient(#bc581e, #e27b36)",
    borderRadius: "50% 50% 0 0",
    boxShadow: "inset -15px 0 #c15711",
    marginBottom: 5,
    position: "relative",
  },
  bunBottom: {
    height: 40,
    width: "80%",
    background: "linear-gradient(#F08E4A, #e27b36)",
    borderRadius: "0 0 30px 30px",
    boxShadow: "inset -15px 0 #c15711",
    marginTop: 5,
  },
  seeds1: {
    width: "8%",
    height: "15%",
    position: "absolute",
    backgroundColor: "white",
    left: "30%",
    top: "50%",
    borderRadius: "40%",
    transform: "rotate(-20deg)",
    boxShadow: "inset -2px -3px #c9c9c9",
    "&::after": {
      content: '""',
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "white",
      left: "-170%",
      top: "-260%",
      borderRadius: "40%",
      transform: "rotate(60deg)",
      boxShadow: "inset -1px 2px #c9c9c9",
    },
    "&::before": {
      content: '""',
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "white",
      left: "180%",
      top: "-50%",
      borderRadius: "40%",
      transform: "rotate(60deg)",
      boxShadow: "inset -1px -3px #c9c9c9",
    },
  },
  seeds2: {
    width: "8%",
    height: "15%",
    position: "absolute",
    backgroundColor: "white",
    left: "64%",
    top: "50%",
    borderRadius: "40%",
    transform: "rotate(-20deg)",
    boxShadow: "inset -3px 0 #c9c9c9",
    "&::before": {
      content: '""',
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "white",
      left: "210%",
      top: "70%",
      borderRadius: "40%",
      transform: "rotate(90deg)",
      boxShadow: "inset 1px 3px #c9c9c9",
    },
  },
}));

const BurgerDisplay = () => {
  const classes = useStyles();
  const ingredients = useSelector(selectIngredients);

  return (
    <div className={classes.root}>
      <div className={classes.bunTop}>
        <div className={classes.seeds1}></div>
        <div className={classes.seeds2}></div>
      </div>
      {ingredients.length === 0 ? (
        <Typography className={classes.text} color="textPrimary" variant="h6">
          Please start adding ingredients!
        </Typography>
      ) : null}

      {ingredients.map((name, idx) => (
        <BurgerIngredient key={idx} type={name} />
      ))}

      <div className={classes.bunBottom} />
    </div>
  );
};

export default BurgerDisplay;
