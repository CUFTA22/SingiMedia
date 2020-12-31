import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: 350,
    height: "auto",
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "15px",
    marginTop: 100,
    paddingBottom: 20,
  },
  media: {
    margin: "-70px auto 0",
    backgroundImage: "linear-gradient(315deg, #cfc7f8 0%, #ebbba7 74%)",
    width: "80%",
    height: 140,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
    zIndex: 10,
  },
  icon: {
    width: spacing(16),
    height: spacing(16),
  },
  content: {
    margin: "20px 0",
  },
}));

const LearnTopic = ({ title, icon, desc }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media}>
        <Avatar
          className={classes.icon}
          src={require(`../../assets/learn/${icon}.svg`).default}
        />
      </CardMedia>
      <CardActionArea className={classes.content}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            noWrap
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default LearnTopic;
