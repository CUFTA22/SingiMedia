import React, { lazy, Suspense, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "./Components/Header/Header";
import Spinner from "./Components/Spinner/Spinner";
import AnimatedCursor from "react-animated-cursor";

const HomePage = lazy(() => import("./Pages/HomePage"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="33,172,243"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
      />
      <Header darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)} />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/signin"
              render={() => (false ? <Redirect to="/" /> : <SignIn />)}
            />
            <Route
              exact
              path="/signup"
              render={() => (false ? <Redirect to="/" /> : <SignUp />)}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
