import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { ReactComponent as Pepe } from "../../assets/error.svg";

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }
  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <>
          <Pepe />
          <Typography color="textSecondary" variant="h3">
            An error has occurred!
          </Typography>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
