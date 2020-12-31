import React, { Suspense, useEffect } from "react";
import { Switch } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import Header from "./Components/Header/Header";
import Spinner from "./Components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./redux/utils/utilsSlice";
import { toggleDarkBody } from "./helpers/utils";
import Routes from "./routes/Routes";
import Auth from "./Components/Auth/Auth";

const App = () => {
  const darkMode = useSelector(selectDarkMode);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

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
              <Auth />
              <Routes />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
