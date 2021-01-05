import React, { useState } from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { ReactComponent as Burger } from "./assets/burger.svg";
import { ReactComponent as Lettuce } from "./assets/lettuce.svg";
import { ReactComponent as Cheese } from "./assets/cheese.svg";
import { ReactComponent as Sauce } from "./assets/sauce.svg";
import { ReactComponent as Meat } from "./assets/meat.svg";
import { ReactComponent as Bacon } from "./assets/bacon.svg";

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

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media}>
        <Burger className={classes.icon} />
      </CardMedia>
      <CardContent>
        <Typography align="center" variant="h6">
          Current Price: 20$
        </Typography>

        <div className={classes.row}>
          <IconButton disabled>
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Lettuce className={classes.icon2} />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.row}>
          <IconButton disabled>
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Cheese className={classes.icon2} />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.row}>
          <IconButton disabled>
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Meat className={classes.icon2} />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.row}>
          <IconButton disabled>
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Bacon className={classes.icon2} />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.row}>
          <IconButton disabled>
            <RemoveIcon />
          </IconButton>
          <IconButton className={classes.margin}>
            <Sauce className={classes.icon2} />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default PizzaForm;
