import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import Header from "./Components/Header/Header";
import Spinner from "./Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  setUser,
  setUserFinish,
  setUserStart,
} from "./redux/user/userSlice";
import { selectDarkMode } from "./redux/utils/utilsSlice";
import { axiosFetch } from "./axios";
import { toggleDarkBody } from "./helpers/utils";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const SignIn = lazy(() => import("./Pages/SignIn/SignIn"));
const AddPost = lazy(() => import("./Pages/AddPost/AddPost"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage/ProfilePage"));
const PostPage = lazy(() => import("./Pages/PostPage/PostPage"));

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    dispatch(setUserStart());

    axiosFetch
      .post("/auth/checkAuth")
      .then((res) => {
        dispatch(
          setUser({
            accessToken: res.data.accessToken,
            userInfo: res.data.userInfo,
          })
        );
        dispatch(setUserFinish());
      })
      .catch(() => {
        dispatch(setUserFinish());
      });
  }, [dispatch]);

  useEffect(() => {
    toggleDarkBody(darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/post" component={PostPage} />
              <Route
                exact
                path="/signin"
                render={() =>
                  isAuthenticated ? <Redirect to="/" /> : <SignIn />
                }
              />
              <Route
                exact
                path="/signup"
                render={() =>
                  isAuthenticated ? <Redirect to="/" /> : <SignUp />
                }
              />
              <Route
                exact
                path="/user"
                render={() =>
                  !isAuthenticated ? <Redirect to="/" /> : <ProfilePage />
                }
              />
              <Route
                exact
                path="/add-post"
                render={() =>
                  !isAuthenticated ? <Redirect to="/" /> : <AddPost />
                }
              />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
