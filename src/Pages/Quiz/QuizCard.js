import React from "react";
import Card from "@material-ui/core/Card";
import {
  Avatar,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: 10,
  },
  title: {
    width: 140,
  },
  root: {
    width: 700,
    maxWidth: "80%",
    display: "flex",
    alignItems: "center",
    padding: 10,
    margin: "0 0 12px 0",
  },
  grow: {
    flexGrow: 1,
  },
  divider: {
    height: 23,
    margin: "0 10px",
  },
  forDesktop: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  easy: {
    color: theme.palette.success.main,
  },
  medium: {
    color: theme.palette.warning.main,
  },
  hard: {
    color: theme.palette.error.main,
  },
  extreme: {
    color: theme.palette.info.main,
  },
}));

const QuizCard = ({ icon, diff, title }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card elevation={4} className={classes.root}>
      <Avatar
        variant="square"
        className={classes.icon}
        src={require(`../../assets/postIcons/${icon}.svg`).default}
      />
      <Typography className={classes.title}>{title}</Typography>
      <Divider
        orientation="vertical"
        className={`${classes.divider} ${classes.forDesktop}`}
      />
      <Typography className={classes.forDesktop}>
        Difficulty:{" "}
        <span
          className={
            diff === "Easy"
              ? classes.easy
              : diff === "Medium"
              ? classes.medium
              : diff === "Hard"
              ? classes.hard
              : classes.extreme
          }
        >
          {diff}
        </span>
      </Typography>
      <div className={classes.grow}></div>
      <Button
        onClick={() => history.push(`/quiz/${icon}`)}
        color="primary"
        variant="contained"
      >
        Start
      </Button>
    </Card>
  );
};

export default QuizCard;
