import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../../Components/Post/Post";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "80px 10px 0 10px",
    [theme.breakpoints.down("xs")]: {
      padding: "0 10px 80px 10px",
    },
  },
}));

const HomePage = (props) => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  return (
    <div className={classes.root} elevation={0}>
      <Post lang="cpp" stars={4} loading={false} />
      <Post lang="c" stars={9} loading={false} />
      <Post lang="angular" stars={24} loading={false} />
      <Post lang="php" stars={1000099999999999999999} loading={false} />
    </div>
  );
};

export default HomePage;
