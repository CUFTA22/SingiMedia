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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar, Divider, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  // selectIsAdmin,
  selectIsAuthenticated,
} from "../../redux/user/userSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
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
}));

const Post = ({
  id,
  stars,
  // userStars,
  username,
  title,
  ghLink,
  desc,
  lang,
  loading,
}) => {
  const [starred, setStarred] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const isAdmin = useSelector(selectIsAdmin);
  const history = useHistory();

  const toggleStar = () => {
    setStarred(!starred);
  };
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
          <Typography>{username}</Typography>
        )}
        <div className={classes.grow}></div>
        {loading ? null : (
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
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
            <IconButton>
              <ShareIcon />
            </IconButton>
            {isAuthenticated ? (
              <>
                <IconButton onClick={toggleStar}>
                  {!starred ? (
                    <StarBorderIcon />
                  ) : (
                    <StarIcon className={classes.gold} />
                  )}
                </IconButton>
                <Typography>{stars}</Typography>
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
