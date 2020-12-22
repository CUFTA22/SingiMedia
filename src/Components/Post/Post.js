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
  selectIsAdmin,
  selectIsAuthenticated,
} from "../../redux/user/userSlice";

const useStyles = makeStyles(() => ({
  card: {
    width: 340,
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

const Post = ({ id, stars, userStars, title, description, lang, loading }) => {
  const [values, setValues] = useState({
    icon: null,
    starred: false,
  });
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    setValues({
      ...values,
      icon: require(`../../assets/postIcons/${lang}.svg`),
    });
  }, [values.icon]);

  const toggleStar = () => {
    setValues({ ...values, starred: !values.starred });
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
            src={values.icon?.default}
            alt="Post language"
          />
        )}

        <div className={classes.grow}></div>

        {loading ? null : (
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        )}
      </CardActions>
      <Divider />
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom noWrap variant="h5">
            {loading ? <Skeleton /> : "Lizard"}
          </Typography>
          <Typography noWrap>
            {loading ? (
              <Skeleton />
            ) : (
              "Rhydon these nuts LLLLLLLLLLLLLLLLLLLLLLLLL"
            )}
          </Typography>
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
            <IconButton onClick={toggleStar}>
              {!values.starred ? (
                <StarBorderIcon />
              ) : (
                <StarIcon className={classes.gold} />
              )}
            </IconButton>
            <Typography>{stars}</Typography>
          </>
        )}

        <div className={classes.grow}></div>
        {loading ? (
          <Skeleton width={107} height={36} />
        ) : (
          <Button
            startIcon={<GitHubIcon />}
            variant="contained"
            className={classes.gh}
          >
            GitHub
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
