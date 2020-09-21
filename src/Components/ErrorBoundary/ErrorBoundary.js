import React, { Component } from "react";
import "./ErrorBoundary.scss";

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
        <div className="errorImg">
          <div className="errorImgContainer"></div>
          <div className="errorImgText">A Dog Ate This Page</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
