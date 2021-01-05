import React from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Burger } from "./assets/burger.svg";
import { ReactComponent as Lettuce } from "./assets/lettuce.svg";
import { ReactComponent as Cheese } from "./assets/cheese.svg";
import { ReactComponent as Sauce } from "./assets/sauce.svg";
import { ReactComponent as Meat } from "./assets/meat.svg";
import { ReactComponent as Bacon } from "./assets/bacon.svg";
import {
  addOne,
  removeOne,
  selectIngredients,
  selectPrice,
} from "../../redux/burger/burgerSlice";

const useStyles = makeStyles(() => ({
  card: {
    margin: "100px auto 50px",
    width: 500,
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  media: {
    background: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",
    margin: "-70px auto 0",
    width: "80%",
    height: 160,
    borderRadius: "4px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
  icon2: {
    width: 40,
    height: 40,
  },
  margin: {
    margin: "0 10px",
  },
}));

const PizzaForm = ({ socket }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const totalPrice = useSelector(selectPrice);

  const addIngredient = (prop) => {
    dispatch(
      addOne({
        name: prop,
      })
    );
  };

  const removeIngredient = (prop) => {
    dispatch(
      removeOne({
        name: prop,
      })
    );
  };

  return (
    <Card elevation={5} className={classes.card}>
      <CardMedia className={classes.media}>
        <Burger className={classes.icon} />
      </CardMedia>
      <CardContent>
        <Typography align="center" variant="h6">
          Current Price: {totalPrice}$
        </Typography>

        <div className={classes.row}>
          <IconButton
            onClick={() => removeIngredient("salad")}
            disabled={ingredients.find((val) => val === "salad") ? false : true}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Lettuce className={classes.icon2} />
          </IconButton>
          <IconButton onClick={() => addIngredient("salad")}>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.row}>
          <IconButton
            onClick={() => removeIngredient("cheese")}
            disabled={
              ingredients.find((val) => val === "cheese") ? false : true
            }
          >
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Cheese className={classes.icon2} />
          </IconButton>
          <IconButton onClick={() => addIngredient("cheese")}>
            <AddIcon />
          </IconButton>
        </div>
        <div
          className={classes.row}
          disabled={ingredients.find((val) => val === "meat") ? false : true}
        >
          <IconButton
            onClick={() => removeIngredient("meat")}
            disabled={ingredients.find((val) => val === "meat") ? false : true}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Meat className={classes.icon2} />
          </IconButton>
          <IconButton onClick={() => addIngredient("meat")}>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.row}>
          <IconButton
            onClick={() => removeIngredient("bacon")}
            disabled={ingredients.find((val) => val === "bacon") ? false : true}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Bacon className={classes.icon2} />
          </IconButton>
          <IconButton onClick={() => addIngredient("bacon")}>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.row}>
          <IconButton
            onClick={() => removeIngredient("sauce")}
            disabled={ingredients.find((val) => val === "sauce") ? false : true}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Sauce className={classes.icon2} />
          </IconButton>
          <IconButton onClick={() => addIngredient("sauce")}>
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default PizzaForm;
