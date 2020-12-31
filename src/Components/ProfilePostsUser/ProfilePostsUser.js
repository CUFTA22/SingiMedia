import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosFetch } from "../../axios";
import { selectAccessToken } from "../../redux/user/userSlice";
import Post from "../Post/Post";

const useStyles = makeStyles(() => ({
  root: {
    width: "80%",
    margin: "0 auto",
  },
}));

const ProfilePostsUser = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([null]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = useSelector(selectAccessToken);

  useEffect(() => {
    if (token) {
      axiosFetch
        .get("posts/forOneUser", {
          params: {
            displayName: params.displayName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(true);
        });
    }
  }, [token, params.displayName]);

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
      spacing={4}
    >
      {posts?.map((post, idx) => (
        <Grid key={idx} item>
          <Post
            id={post?._id}
            username={post?.user.displayName}
            title={post?.title}
            desc={post?.desc}
            ghLink={post?.ghLink}
            lang={post?.lang}
            stars={post?.stars}
            loading={loading}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfilePostsUser;
