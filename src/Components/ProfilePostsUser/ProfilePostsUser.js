import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosFetch } from "../../axios";
import { selectPosts, setPosts } from "../../redux/posts/postsSlice";
import Post from "../Post/Post";

const useStyles = makeStyles(() => ({
  root: {
    width: "80%",
    margin: "0 auto",
  },
}));

const ProfilePostsUser = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosFetch
      .get("posts/forOneUser", {
        params: {
          displayName: params.displayName,
        },
      })
      .then((res) => {
        dispatch(setPosts(res.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
      });
  }, [params.displayName, dispatch]);

  return (
    <Grid
      className={classes.root}
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
  );
};

export default ProfilePostsUser;
