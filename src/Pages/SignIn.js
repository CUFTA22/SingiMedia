import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import SignUpComp from "../Components/SignUpComp/SignUpComp";
import SignInComp from "../Components/SignInComp/SignInComp";
import "./SignIn.scss";

const SignIn = () => {
  const [compIn, setCompIn] = useState(null);
  const [compUp, setCompUp] = useState(1);

  const clickOnLeft = () => {
    setCompUp(1);
    setCompIn(null);
  };
  const clickOnRight = () => {
    setCompIn(1);
    setCompUp(null);
  };

  return (
    <div className="signin">
      <img src={require("../assets/SingiHeader.png")} alt="Singi Media logo" />
      <div className="signin-form">
        <Paper className="signin-paper" elevation={3}>
          <div className="signin-paper-top">
            <div
              onClick={clickOnLeft}
              className={`signin-paper-top-div ${compUp && "signin-active"}`}
            >
              Sign Up
            </div>
            <div
              onClick={clickOnRight}
              className={`signin-paper-top-div ${compIn && "signin-active"}`}
            >
              Sign In
            </div>
          </div>
          {compUp ? <SignUpComp /> : <SignInComp />}
        </Paper>
      </div>
    </div>
  );
};

export default SignIn;
