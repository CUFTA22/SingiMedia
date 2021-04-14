import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosFetch } from "../../axios";
import { selectAccessToken } from "../../redux/user/userSlice";
import Timer from "react-compound-timer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "90px 0",
  },
  questionBox: {
    position: "relative",
    width: 800,
    maxWidth: "95%",
    height: "auto",
    padding: "50px 0 35px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  answerRow: {
    width: "70%",
  },
  count: {
    position: "absolute",
    top: 14,
    left: 14,
  },
  timer: {
    position: "absolute",
    top: 14,
    right: 14,
    fontWeight: 600,
  },
  submitButton: {
    marginTop: 20,
  },
  selectedAnswer: {
    border: "2px solid #3F51B5",
  },
});

const Quiz = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const token = useSelector(selectAccessToken);
  const { enqueueSnackbar } = useSnackbar();

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);

  // Anti-cheat
  const handleMouseOut = useCallback(
    (e) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        history.push("/testus");
        enqueueSnackbar(`Test Failed | No cheating!`, {
          variant: `error`,
        });
      }
    },
    [enqueueSnackbar, history]
  );

  const generateRandQuestions = useCallback(() => {
    const allQs = require(`./questions/${params.subject}Q`).default;
    const res = [];

    console.log("Number of questions: " + allQs.length);

    for (;;) {
      const randomQ = Math.floor(Math.random() * allQs.length);
      if (res.length === 15) break;
      if (res.indexOf(allQs[randomQ]) !== -1) {
        continue;
      }
      res.push(allQs[randomQ]);
    }
    setAllQuestions(res);
  }, [params.subject]);

  const submitAnswer = (a) => {
    if (counter === 15) return;

    if (a && currentQuestion[`${a}`].T) setScore(score + 1);

    setCurrentQuestion(allQuestions[counter + 1]);
    setSelectedAnswer("");
    setCounter(counter + 1);
  };

  const outOfTime = () => {
    history.push("/testus");
    enqueueSnackbar(`Test Failed | Out of Time!`, {
      variant: `error`,
    });
  };
  const halfOfTime = () => {
    enqueueSnackbar(`7:30 Minutes Remaining!`, {
      variant: `warning`,
    });
  };

  const getResults = useCallback(() => {
    if (score > 14) {
      history.push("/testus");
      axiosFetch
        .post(
          "/quiz/success",
          {
            subject: params.subject,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          enqueueSnackbar(`${res.data.message}`, {
            variant: `success`,
          });
        })
        .catch((err) => {
          enqueueSnackbar(`${err.response.data.message}`, {
            variant: `warning`,
          });
        });
    } else {
      history.push("/testus");
      enqueueSnackbar(`Test Failed | ${score}/15 points!`, {
        variant: `error`,
      });
    }
  }, [enqueueSnackbar, history, score, token, params.subject]);

  useEffect(() => {
    // Anti-cheat
    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, [handleMouseOut]);

  useEffect(() => {
    // Function to get 15 random question from list of all
    generateRandQuestions();
  }, [generateRandQuestions]);

  useEffect(() => {
    if (counter === 15) {
      getResults();
    }
  }, [counter, getResults]);

  useEffect(() => {
    setCurrentQuestion(allQuestions[0]);
  }, [allQuestions]);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{params.subject} Test | Singi Media</title>
        <meta
          name="description"
          content="Singi Media PWA is a platform for sharing GitHub code on the web. It is a single page application built in React with a bunch of other libraries that make a modern web application."
        />
      </Helmet>
      <Paper elevation={5} className={classes.questionBox}>
        <Typography className={classes.count}>{counter + 1}/15</Typography>
        <div className={classes.timer}>
          <Timer
            initialTime={900000}
            direction="backward"
            checkpoints={[
              { time: 0, callback: () => outOfTime() },
              { time: 450000, callback: () => halfOfTime() },
            ]}
          >
            <>
              <Timer.Minutes /> m <Timer.Seconds /> s
            </>
          </Timer>
        </div>

        {currentQuestion?.question ? (
          <Typography variant="h5">{currentQuestion.question}</Typography>
        ) : null}
        {currentQuestion?.code ? (
          <SyntaxHighlighter
            showLineNumbers
            language={
              params.subject === "react"
                ? "jsx"
                : params.subject === "python"
                ? "python"
                : "jsx"
            }
            style={vscDarkPlus}
          >
            {currentQuestion.code}
          </SyntaxHighlighter>
        ) : null}
        <List
          component="nav"
          className={classes.answerRow}
          aria-label="main mailbox folders"
        >
          <ListItem onClick={() => setSelectedAnswer("a1")} button>
            <Checkbox color="primary" checked={selectedAnswer === "a1"} />
            <ListItemText primary={`${currentQuestion?.a1.a}`} />
          </ListItem>
          <ListItem onClick={() => setSelectedAnswer("a2")} button>
            <Checkbox color="primary" checked={selectedAnswer === "a2"} />
            <ListItemText primary={`${currentQuestion?.a2.a}`} />
          </ListItem>
          <ListItem onClick={() => setSelectedAnswer("a3")} button>
            <Checkbox color="primary" checked={selectedAnswer === "a3"} />
            <ListItemText primary={`${currentQuestion?.a3.a}`} />
          </ListItem>
          <ListItem onClick={() => setSelectedAnswer("a4")} button>
            <Checkbox color="primary" checked={selectedAnswer === "a4"} />
            <ListItemText primary={`${currentQuestion?.a4.a}`} />
          </ListItem>
        </List>
        <Button
          className={classes.submitButton}
          onClick={() => submitAnswer(selectedAnswer)}
          color="primary"
          variant="contained"
        >
          Submit Answer
        </Button>
      </Paper>
    </div>
  );
};

export default Quiz;
