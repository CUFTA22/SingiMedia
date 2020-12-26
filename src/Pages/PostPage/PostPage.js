import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosFetch } from "../../axios";
import { ReactComponent as Pepe } from "../../assets/error.svg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import GitHubIcon from "@material-ui/icons/GitHub";
import ShareIcon from "@material-ui/icons/Share";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  Avatar,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "40px auto 30px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px 10px 0 10px",
    },
  },
  card: {
    maxWidth: 600,
  },
  gold: {
    color: "#f2af4c",
  },
  book: {
    color: "#90CAF9",
  },
  gh: {
    color: "#fafbfc",
    background: "#24292e",
    "&:hover": {
      color: "#f1f8ff",
      background: "#24292a",
    },
  },
  grow: {
    flexGrow: 1,
  },
  abs: {
    position: "absolute",
    top: "40%",
  },
}));

const PostPage = () => {
  const classes = useStyles();
  const params = useParams();
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const isAdmin = useSelector(selectIsAdmin);
  const [starred, setStarred] = useState(false);
  const [booked, setBooked] = useState(false);

  const [icon, setIcon] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleStar = () => {
    setStarred(!starred);
  };
  const toggleBook = () => {
    setBooked(!booked);
  };

  useEffect(() => {
    axiosFetch
      .get(`/posts/getOne`, {
        params: {
          id: params.id,
        },
      })
      .then((res) => {
        setLoading(false);
        setPost(res.data);
        setIcon(require(`../../assets/postIcons/${res.data.lang}.svg`));
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <div className={classes.root}>
      {!loading ? (
        error ? (
          <>
            <Pepe />
            <Typography color="textSecondary" variant="h3">
              Post Not Found
            </Typography>
          </>
        ) : (
          <Card elevation={6} className={classes.card}>
            <CardActions>
              <Avatar
                variant="square"
                src={icon?.default}
                alt="Post language"
              />

              <Typography>{post?.user.displayName}</Typography>

              <div className={classes.grow}></div>

              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </CardActions>
            <Divider />

            <CardContent>
              <Typography align="center" variant="h5">
                {post?.title}
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <Typography align="center">{post?.desc}</Typography>
            </CardContent>

            <CardActions>
              <IconButton>
                <ShareIcon />
              </IconButton>
              <IconButton onClick={toggleBook}>
                {!booked ? (
                  <BookmarkBorderIcon />
                ) : (
                  <BookmarkIcon className={classes.book} />
                )}
              </IconButton>
              <IconButton onClick={toggleStar}>
                {!starred ? (
                  <StarBorderIcon />
                ) : (
                  <StarIcon className={classes.gold} />
                )}
              </IconButton>
              <Typography>{post?.stars}</Typography>

              <div className={classes.grow}></div>

              <a href={post?.ghLink} target="_blank" rel="noopener noreferrer">
                <Button
                  startIcon={<GitHubIcon />}
                  variant="contained"
                  className={classes.gh}
                >
                  Visit Repo
                </Button>
              </a>
            </CardActions>
          </Card>
        )
      ) : (
        <CircularProgress className={classes.abs} />
      )}
    </div>
  );
};

export default PostPage;
