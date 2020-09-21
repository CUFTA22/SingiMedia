import React from "react";
import "./HPRight.scss";
import Divider from "@material-ui/core/Divider";

const HPRight = () => {
  return (
    <div className="hpright">
      <h2>News</h2>
      <Divider className="hpright-line" />
      <h2>Friends</h2>
      <Divider className="hpright-line" />
    </div>
  );
};

export default HPRight;
