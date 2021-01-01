import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../../Components/Post/Post";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as Pepe } from "../../assets/error.svg";

import {
  selectPostsLoading,
  selectPosts,
  selectPostsError,
} from "../../redux/posts/postsSlice";
import { useSelector } from "react-redux";
import HPFilters from "./HPFilters";
import { Typography } from "@material-ui/core";

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

const HomePage = () => {
  const classes = useStyles();
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const posts = useSelector(selectPosts);

  return (
    <div className={classes.root}>
      {!error ? (
        <>
          <HPFilters />
          <Grid
            className={classes.grid}
            container
            justify="center"
            alignItems="center"
            spacing={4}
          >
            {posts.map((post, idx) => (
              <Grid key={idx} item>
                <Post
                  id={post?._id}
                  username={post?.user.displayName}
                  title={post?.title}
                  desc={post?.desc}
                  ghLink={post?.ghLink}
                  lang={post?.lang}
                  usersStar={post?.usersStar}
                  loading={loading}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Pepe />
          <Typography color="textSecondary" variant="h3">
            Failed to load posts
          </Typography>
        </>
      )}
    </div>
  );
};

export default HomePage;
