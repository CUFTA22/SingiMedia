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
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "80px auto 30px auto",
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "20px auto 140px auto",
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
      <Helmet>
        <title>Singi Media</title>
        <meta
          name="description"
          content="Singi Media PWA is a platform for sharing GitHub code on the web. It is a single page application built in React with a bunch of other libraries that make a modern web application."
        />
      </Helmet>
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
            {posts?.map((post) => (
              <Grid key={post?._id} item>
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
