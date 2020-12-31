import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosFetch } from "../../axios";
import { selectAccessToken } from "../../redux/user/userSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "70px 0",
  },
  questionBox: {
    position: "relative",
    width: 800,
    maxWidth: "95%",
    height: "auto",
    padding: "50px 0",
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
});

const Quiz = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory(selectAccessToken);
  const token = useSelector(selectAccessToken);
  const { enqueueSnackbar } = useSnackbar();

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);

  // Anti-cheat
  const handleMouseOut = (e) => {
    if (
      e.clientY <= 0 ||
      e.clientX <= 0 ||
      e.clientX >= window.innerWidth ||
      e.clientY >= window.innerHeight
    ) {
      history.push("/earn-badge");
      enqueueSnackbar(`Test Failed | No cheating!`, {
        variant: `error`,
      });
    }
  };

  const generateRandQuestions = () => {
    const allQs = require(`./questions/${params.subject}Q`).default;
    const res = [];

    console.log("Number of questions: " + allQs.length);

    for (;;) {
      const randomQ = Math.floor(Math.random() * allQs.length);
      if (res.length === 10) break;
      if (res.indexOf(allQs[randomQ]) !== -1) {
        continue;
      }
      res.push(allQs[randomQ]);
    }
    setAllQuestions(res);
  };

  const submitAnswer = (a) => {
    if (counter === 10) return;

    if (currentQuestion[`${a}`].T) setScore(score + 1);

    setCurrentQuestion(allQuestions[counter + 1]);
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (counter === 10) {
      getResults();
    }
  }, [counter]);

  const getResults = () => {
    if (score > 0) {
      history.push("/earn-badge");
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
      enqueueSnackbar(`Test Failed | ${score}/10 points!`, {
        variant: `error`,
      });
    }
  };

  useEffect(() => {
    // Function to get 10 random question from list of all
    generateRandQuestions();

    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, []);

  useEffect(() => {
    setCurrentQuestion(allQuestions[0]);
  }, [allQuestions]);

  return (
    <div className={classes.root}>
      <Paper elevation={5} className={classes.questionBox}>
        <Typography className={classes.count}>{counter}/9</Typography>
        {currentQuestion?.question ? (
          <Typography variant="h5">{currentQuestion.question}</Typography>
        ) : null}
        {currentQuestion?.code ? (
          <SyntaxHighlighter
            showLineNumbers
            language="javascript"
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
          <ListItem onClick={() => submitAnswer("a1")} button>
            <ListItemText primary={`A. ${currentQuestion?.a1.a}`} />
          </ListItem>
          <ListItem onClick={() => submitAnswer("a2")} button>
            <ListItemText primary={`B. ${currentQuestion?.a2.a}`} />
          </ListItem>
          <ListItem onClick={() => submitAnswer("a3")} button>
            <ListItemText primary={`C. ${currentQuestion?.a3.a}`} />
          </ListItem>
          <ListItem onClick={() => submitAnswer("a4")} button>
            <ListItemText primary={`D. ${currentQuestion?.a4.a}`} />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default Quiz;
