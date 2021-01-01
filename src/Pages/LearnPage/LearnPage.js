import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { topics } from "./topics";
import LearnTopic from "../../Components/LearnTopic/LearnTopic";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto 30px auto",
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px 10px 0 10px",
    },
  },

  grid: {
    width: "100%",
    margin: 0,
  },
}));

const LearnPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
