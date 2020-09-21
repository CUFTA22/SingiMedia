import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import Fab from "@material-ui/core/Fab";
import { auth } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      justifyContent: "center",
      margin: "35px 0 0 115px",
      width: "60%",
    },
    "& .signup-end": {
      marginBottom: "40px",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SignInComp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="E-Mail"
        variant="outlined"
        type="email"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label="Password"
        variant="outlined"
        type="password"
      />
      <div className="signup-end">
        <Fab onClick={signIn} color="secondary" variant="extended">
          <NavigationRoundedIcon className={classes.extendedIcon} />
          Sign In
        </Fab>
      </div>
    </form>
  );
};

export default SignInComp;
