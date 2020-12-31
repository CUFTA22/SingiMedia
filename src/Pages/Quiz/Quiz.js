import { makeStyles } from "@material-ui/core";
import React from "react";
import QuizCard from "./QuizCard";
import { quizzes } from "./quizzes";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 0",
  },
});

const Quiz = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
