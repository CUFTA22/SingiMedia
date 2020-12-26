import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../../Components/Post/Post";
import Grid from "@material-ui/core/Grid";
import SpeedDial from "@material-ui/lab/SpeedDial";
import EventIcon from "@material-ui/icons/Event";
import TodayIcon from "@material-ui/icons/Today";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import StarIcon from "@material-ui/icons/Star";
import Visibility from "@material-ui/icons/Visibility";
import TuneIcon from "@material-ui/icons/Tune";
import {
  fetchPostsAsync,
  selectPostsLoading,
  selectPosts,
} from "../../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto 30px auto",
    padding: "80px 10px 0 10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px 10px 0 10px",
    },
  },
  speedDial: {
    position: "absolute",
    top: 86,
    left: 12,
  },
}));

const actions = [
  { icon: <StarIcon />, name: "Stars" },
  { icon: <TodayIcon />, name: "Oldest" },
  { icon: <EventIcon />, name: "Newest" },
];

const HomePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(selectPostsLoading);
  const posts = useSelector(selectPosts);
  const [filter, setFilter] = useState("Stars");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChoice = (name) => {
    setFilter(name);
    handleClose();
  };
  useEffect(() => {
    dispatch(fetchPostsAsync(filter));
  }, [filter]);

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<TuneIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() => handleChoice(action.name)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.root}
      >
        {posts.map((post, idx) => (
          <Grid key={idx} item>
            <Post
              title={post?.title}
              desc={post?.desc}
              ghLink={post?.ghLing}
              lang={post?.lang}
              stars={post?.stars}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
