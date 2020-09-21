import React from "react";
import Header from "../Components/Header/Header";
import Posts from "../Components/Posts/Posts";
import HPLeft from "../Components/HPLeft/HPLeft";
import HPRight from "../Components/HPRight/HPRight";
import "./HomePage.scss";

const HomePage = (props) => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <HPLeft props={props.userValues} />
        <Posts />
        <HPRight />
      </div>
    </div>
  );
};

export default HomePage;
