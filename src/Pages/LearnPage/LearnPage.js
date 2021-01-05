import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Helmet } from "react-helmet";
import { topics } from "./topics";
import LearnTopic from "../../Components/LearnTopic/LearnTopic";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "80px auto 30px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "10px auto 100px auto",
    },
  },
  grid: {
    width: "100%",
  },
}));

const LearnPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Learn | Singi Media</title>
        <meta
          name="description"
          content="Singi Media PWA is a platform for sharing GitHub code on the web. It is a single page application built in React with a bunch of other libraries that make a modern web application. Start learning now."
        />
      </Helmet>
      <Grid
        className={classes.grid}
        container
        justify="center"
        alignItems="center"
        spacing={4}
      >
        {topics.map((item, idx) => (
          <Grid key={idx} item>
            <LearnTopic
              grad={item.grad}
              title={item.title}
              icon={item.icon}
              desc={item.desc}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LearnPage;
