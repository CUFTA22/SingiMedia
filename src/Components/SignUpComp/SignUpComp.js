import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import MaskedInput from "react-text-mask";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Fab from "@material-ui/core/Fab";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Icon from "@material-ui/core/Icon";
import { auth, db } from "../../firebase";
import { loadCSS } from "fg-loadcss";
import "./SignUpComp.scss";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .signup-name-input, .signup-index": {
      width: "45%",
    },
    "& .signup-single": {
      justifyContent: "center",
      margin: "35px 0 0 30px",
      width: "90%",
    },
    "& .google-grad": {
      background:
        "linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335)",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[2]/,
        /[0]/,
        /[1,2]/,
        /[0-9]/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"_"}
      showMask
    />
  );
}

const SignUpComp = () => {
  const classes = useStyles();
  const [passMatch, setPassMatch] = React.useState(true);
  const [pass6, setPass6] = React.useState(false);
  const [mailGood, setMailGood] = React.useState(false);
  const [values, setValues] = React.useState({
    textmask: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });
  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const regExMail = /^[\w0-9_.+-]+@[\w0-9-]+\.[\w0-9-.]+$/;
    const {
      firstName,
      lastName,
      username,
      email,
      textmask,
      password,
      confirmPassword,
    } = values;

    let err = 0;
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      textmask === ""
    ) {
      alert("No empty fields!");
      err++;
    }
    if (password.length < 6) {
      setPass6(true);
      err++;
    } else {
      setPass6(false);
    }

    if (password !== confirmPassword) {
      setPassMatch(false);
      err++;
    } else {
      setPassMatch(true);
    }

    if (!regExMail.test(String(email).toLowerCase())) {
      setMailGood(true);
      err++;
    } else {
      setMailGood(false);
    }

    if (err !== 0) {
      console.log(err);
      console.log(textmask);
      return false;
    }

    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          db.collection("users").doc(authUser.user.uid).set({
            firstName: firstName,
            lastName: lastName,
            indexNumber: textmask,
            rank: "User 🥰",
          });
          return authUser.user.updateProfile({
            displayName: username,
          });
        })
        .catch((error) => {
          alert(error.message);
        });

      setValues({
        textmask: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setPassMatch(true);
      setPass6(false);
      setMailGood(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="signup-dbl">
        <TextField
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          className="signup-name-input"
          label="First Name"
          variant="outlined"
        />
        <TextField
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          className="signup-name-input"
          label="Last Name"
          variant="outlined"
        />
      </div>
      <div className="signup-dbl">
        <TextField
          name="username"
          value={values.username}
          onChange={handleChange}
          className="signup-name-input"
          label="Username"
          variant="outlined"
        />
        <FormControl className="signup-index">
          <InputLabel htmlFor="formatted-text-mask-input">
            Index Number
          </InputLabel>
          <Input
            value={values.textmask}
            onChange={handleChange}
            name="textmask"
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          />
        </FormControl>
      </div>
      <TextField
        error={mailGood ? true : false}
        helperText={mailGood ? "Enter valid e-mail" : ""}
        name="email"
        value={values.email}
        onChange={handleChange}
        className="signup-single"
        label="E-Mail"
        variant="outlined"
        type="email"
      />
      <div className="signup-dbl">
        <FormControl
          error={pass6 ? true : false}
          variant="outlined"
          className="signup-name-input"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            variant="outlined"
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
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
            labelWidth={75}
          />
          {!pass6 ? null : (
            <FormHelperText>Password must be 6 char or longer</FormHelperText>
          )}
        </FormControl>
        <TextField
          error={passMatch ? false : true}
          helperText={passMatch ? "" : "Password must match"}
          id="confirmPass"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          className="signup-name-input"
          label="Repeat Password"
          variant="outlined"
          type="password"
        />
      </div>
      <div className="signup-end">
        <Fab color="primary" aria-label="edit">
          <Icon className="fab fa-facebook" style={{ color: "white" }} />
        </Fab>
        <Fab onClick={handleSubmit} color="secondary" variant="extended">
          <PersonAddIcon className={classes.extendedIcon} />
          Sign Up
        </Fab>
        <Fab className="google-grad" color="primary" aria-label="add">
          <Icon className="fab fa-google" style={{ color: "white" }} />
        </Fab>
      </div>
    </form>
  );
};

export default SignUpComp;
