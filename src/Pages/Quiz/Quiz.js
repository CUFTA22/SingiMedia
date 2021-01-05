import { makeStyles } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import QuizCard from "./QuizCard";
import { quizzes } from "./quizzes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "120px 0",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "20px 0",
    },
  },
}));

const Quiz = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Earn Badge | Singi Media</title>
        <meta
          name="description"
          content="Singi Media PWA is a platform for sharing GitHub code on the web. It is a single page application built in React with a bunch of other libraries that make a modern web application."
        />
      </Helmet>
      {quizzes?.map((quiz, idx) => (
        <QuizCard
          key={idx}
          icon={quiz.icon}
          title={quiz.title}
          diff={quiz.diff}
        />
      ))}
    </div>
  );
};

export default Quiz;
