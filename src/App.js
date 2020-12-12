import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import Header from "./Components/Header/Header";
import Spinner from "./Components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./redux/user/userSlice";

const HomePage = lazy(() => import("./Pages/HomePage"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [darkMode, setDarkMode] = useState(true);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={() => setDarkMode(!darkMode)}
        />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={HomePage} />
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
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
