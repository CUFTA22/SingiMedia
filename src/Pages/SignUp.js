import React from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { ReactComponent as Hacker } from "../assets/hacker2.svg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bg: {
    display: "flex",
    height: "calc(100vh - 64px)",
    width: "100vw",
    borderRadius: 0,
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 56px)",
    },
  },
  card: {
    margin: "120px auto 0 auto",
    width: 345,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "fit-content",
    paddingBottom: "15px",
    overflow: "visible",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",

    "& > div": {
      width: "100%",
      margin: "12px 0",
    },
  },
  media: {
    margin: "-70px auto 0",
    backgroundImage: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
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
  logo: {
    width: 95,
    height: 95,
  },
  switch: {
    color: theme.palette.info.light,
    textDecoration: "underline",
    cursor: "pointer",
    margin: "5px 0",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    repeat: "",
    showPassword: false,
    empty: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ display: "flex" }}>
      <Paper className={classes.bg}>
        <Card elevation={5} className={classes.card}>
          <CardMedia className={classes.media} title="Sign In">
            <Hacker className={classes.logo} />
          </CardMedia>

          <CardContent className={classes.fields}>
            <FormControl>
              <InputLabel htmlFor="standard-adornment-username">
                Username
              </InputLabel>
              <Input
                id="standard-adornment-username"
                value={values.username}
                onChange={handleChange("username")}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="standard-adornment-password">
                Repeat Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.repeat}
                onChange={handleChange("repeat")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </CardContent>

          <CardActions>
            <Button
              onClick={() => console.log(window.innerWidth < 600)}
              size="large"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </CardActions>

          <Typography class={classes.switch}>
            <Link to="/signin">Already have an account?</Link>
          </Typography>
        </Card>
      </Paper>
    </div>
  );
};

export default SignUp;
