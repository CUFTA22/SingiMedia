import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosFetch } from "../../axios";
import { ReactComponent as Pepe } from "../../assets/error.svg";
import Card from "@material-ui/core/Card";
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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import {
  selectAccessToken,
  selectIsAdmin,
  selectUser,
} from "../../redux/user/userSlice";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

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
  del: {
    color: theme.palette.error.main,
  },
  edit: {
    color: theme.palette.info.main,
  },
}));

const PostPage = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const { enqueueSnackbar } = useSnackbar();
  const isAdmin = useSelector(selectIsAdmin);
  const userInfo = useSelector(selectUser);
  const token = useSelector(selectAccessToken);

  const [starred, setStarred] = useState(false);
  const [booked, setBooked] = useState(false);

  const [icon, setIcon] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleStar = () => {
    axiosFetch
      .post(
        "/posts/star",
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setStarred(!starred);
      });
  };

  const toggleBook = () => {
    setBooked(!booked);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`);
    enqueueSnackbar(`Copied to Clipboard!`, {
      variant: `success`,
    });
  };

  const submitDelete = () => {
    axiosFetch
      .post(
        "/posts/delete",
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        history.push("/");
      });
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
        if (res.data.usersStar.indexOf(userInfo?.displayName) !== -1) {
          setStarred(true);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [params.id, starred, userInfo.displayName]);

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

              {userInfo?.displayName === post?.user.displayName ? (
                <IconButton className={classes.edit}>
                  <EditIcon />
                </IconButton>
              ) : null}
              {isAdmin || userInfo?.displayName === post?.user.displayName ? (
                <IconButton onClick={submitDelete} className={classes.del}>
                  <DeleteIcon />
                </IconButton>
              ) : null}
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
              <IconButton onClick={copyToClipboard}>
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
              <Typography>{post?.usersStar.length}</Typography>

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
