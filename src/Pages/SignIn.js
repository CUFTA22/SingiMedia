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
import { ReactComponent as Hacker } from "../assets/hacker.svg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { axiosFetch } from "../axios";
import { setUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  card: {
    margin: "180px auto 0 auto",
    width: 345,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "fit-content",
    paddingBottom: "15px",
    overflow: "visible",
    [theme.breakpoints.down("xs")]: {
      margin: "120px auto 0 auto",
    },
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

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = React.useState({
    displayName: "",
    password: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosFetch
      .post(
        "/auth/login",
        {
          displayName: values.displayName,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        enqueueSnackbar(`${res.data.message}`, {
          variant: `success`,
        });

        dispatch(
          setUser({
            accessToken: res.data.accessToken,
            userInfo: res.data.userInfo,
          })
        );
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data.message}`, {
          variant: `${err.response.data.variant}`,
        });
      });
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
                value={values.displayName}
                onChange={handleChange("displayName")}
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
          </CardContent>

          <CardActions>
            <Button
              onClick={handleSubmit}
              size="large"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </CardActions>
          <Link to="/signup"></Link>
          <Typography className={classes.switch}>
            <Link to="/signup">Don't have an account?</Link>
          </Typography>
        </Card>
      </Paper>
    </div>
  );
};

export default SignIn;
