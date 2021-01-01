import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import GitHubIcon from "@material-ui/icons/GitHub";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Avatar, Divider, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessToken,
  selectIsAdmin,
  selectIsAuthenticated,
  selectUser,
} from "../../redux/user/userSlice";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { axiosFetch } from "../../axios";
import { removeOne } from "../../redux/posts/postsSlice";

const useStyles = makeStyles((theme) => ({
  del: {
    color: theme.palette.error.main,
  },
  edit: {
    color: theme.palette.info.main,
  },
  card: {
    width: 320,
  },
  gold: {
    color: "#f2af4c",
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
  clickable: {
    cursor: "pointer",
  },
}));

const Post = ({
  id,
  usersStar,
  username,
  title,
  ghLink,
  desc,
  lang,
  loading,
}) => {
  const [starred, setStarred] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const token = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUser);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${id}`);
    enqueueSnackbar(`Copied to Clipboard!`, {
      variant: `success`,
    });
  };

  const submitDelete = () => {
    axiosFetch
      .post(
        "/posts/delete",
        {
          postId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(removeOne({ id }));
      });
  };

  useEffect(() => {
    if (usersStar?.indexOf(userInfo?.displayName) !== -1) {
      setStarred(true);
    } else {
      setStarred(false);
    }
  }, [usersStar, userInfo.displayName]);

  const classes = useStyles();
  return (
    <Card elevation={6} className={classes.card}>
      <CardActions>
        {loading ? (
          <Skeleton variant="circle" width={40} height={40} />
        ) : (
          <Avatar
            variant="square"
            src={
              lang ? require(`../../assets/postIcons/${lang}.svg`).default : ""
            }
            alt="Post language"
          />
        )}

        {loading ? (
          <Skeleton variant="text" width={100} height={20} />
        ) : (
          <Typography
            className={classes.clickable}
            onClick={() => history.push(`/user/${username}`)}
          >
            {username}
          </Typography>
        )}
        <div className={classes.grow}></div>
        {loading ? null : (
          <>
            {userInfo?.displayName === username ? (
              <IconButton className={classes.edit}>
                <EditIcon />
              </IconButton>
            ) : null}
            {isAdmin || userInfo?.displayName === username ? (
              <IconButton onClick={submitDelete} className={classes.del}>
                <DeleteIcon />
              </IconButton>
            ) : null}
          </>
        )}
      </CardActions>
      <Divider />
      <CardActionArea
        onClick={() => (!loading ? history.push(`/post/${id}`) : null)}
      >
        <CardContent>
          <Typography gutterBottom noWrap variant="h5">
            {loading ? <Skeleton /> : title}
          </Typography>
          <Typography noWrap>{loading ? <Skeleton /> : desc}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {loading ? (
          <Skeleton width={120} height={30} />
        ) : (
          <>
            <IconButton onClick={copyToClipboard}>
              <ShareIcon />
            </IconButton>
            {isAuthenticated ? (
              <>
                <IconButton disabled>
                  {!starred ? (
                    <StarBorderIcon />
                  ) : (
                    <StarIcon className={classes.gold} />
                  )}
                </IconButton>
                <Typography>{usersStar?.length}</Typography>
              </>
            ) : null}
          </>
        )}
        <div className={classes.grow}></div>
        {loading ? (
          <Skeleton width={107} height={36} />
        ) : (
          <a href={ghLink} target="_blank" rel="noopener noreferrer">
            <Button
              startIcon={<GitHubIcon />}
              variant="contained"
              className={classes.gh}
            >
              GitHub
            </Button>
          </a>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
