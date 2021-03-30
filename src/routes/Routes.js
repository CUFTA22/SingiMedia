import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import SearchPage from "../Pages/SearchPage/SearchPage";
import { selectIsAuthenticated } from "../redux/user/userSlice";

const HomePage = lazy(() => import("../Pages/HomePage/HomePage"));
const SignIn = lazy(() => import("../Pages/SignIn/SignIn"));
const AddPost = lazy(() => import("../Pages/AddPost/AddPost"));
const SignUp = lazy(() => import("../Pages/SignUp/SignUp"));
const ProfilePage = lazy(() => import("../Pages/ProfilePage/ProfilePage"));
const PostPage = lazy(() => import("../Pages/PostPage/PostPage"));
const LearnPage = lazy(() => import("../Pages/LearnPage/LearnPage"));
const QuizPage = lazy(() => import("../Pages/Quiz/Quiz"));
const QuizStart = lazy(() => import("../Pages/QuizStart/QuizStart"));
const WebGL = lazy(() => import("../WebGL/index"));
const BurgerPage = lazy(() => import("../Pages/BurgerPage/BurgerPage"));

const Routes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/learn" component={LearnPage} />
      <Route exact path="/webGL" component={WebGL} />
      <Route exact path="/burger" component={BurgerPage} />

      <Route path="/post/:id" component={PostPage} />
      <Route path="/search/:query" component={SearchPage} />
      <Route path="/user/:displayName" component={ProfilePage} />

      <Route
        exact
        path="/signin"
        render={() => (isAuthenticated ? <Redirect to="/" /> : <SignIn />)}
      />
      <Route
        exact
        path="/signup"
        render={() => (isAuthenticated ? <Redirect to="/" /> : <SignUp />)}
      />
      <Route
        exact
        path="/add-post"
        render={() => (!isAuthenticated ? <Redirect to="/" /> : <AddPost />)}
      />
      <Route
        exact
        path="/earn-badge"
        render={() => (!isAuthenticated ? <Redirect to="/" /> : <QuizPage />)}
      />
      <Route
        exact
        path="/quiz/:subject"
        render={() => (!isAuthenticated ? <Redirect to="/" /> : <QuizStart />)}
      />
    </>
  );
};

export default Routes;
