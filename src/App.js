import React, { lazy, Suspense, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "./Components/Header/Header";

const HomePage = lazy(() => import("./Pages/HomePage"));
const SignIn = lazy(() => import("./Pages/SignIn"));
// const ProfilePage = lazy(() => import("./Pages/ProfilePage"));

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)} />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/signin"
              render={() => (false ? <Redirect to="/" /> : <SignIn />)}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
