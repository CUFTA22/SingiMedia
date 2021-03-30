import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosFetch } from "../../axios";
import Post from "../../Components/Post/Post";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100vw",
    marginTop: 100,
  },
  spin: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const SearchPage = () => {
  const classes = useStyles();
  const { query } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosFetch
      .get("posts/search", {
        params: {
          query,
        },
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [query]);
  return (
    <div>
      {loading ? (
        <div className={classes.spin}>
          <CircularProgress size={70} />
        </div>
      ) : !error ? (
        <div className={classes.root}>
          <Grid
            className={classes.grid}
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
                  usersStar={post?.usersStar}
                  loading={loading}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div className={classes.spin}>Error</div>
      )}
    </div>
  );
};

export default SearchPage;
