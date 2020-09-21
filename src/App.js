import React, { useState, lazy, useEffect, Suspense } from "react";
import UserProvider from "./Providers/UserProvider";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, db } from "./firebase";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import Spinner from "./Components/Spinner/Spinner";

const HomePage = lazy(() => import("./Pages/HomePage"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));

const App = () => {
  const [userExists, setUserExists] = useState(null);
  const [userValues, setUserValues] = useState({
    firstName: "",
    lastName: "",
    indexNumber: "",
    rank: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUserExists(true);

        db.collection("users")
          .doc(`${authUser.uid}`)
          .get()
          .then((doc) => {
            setUserValues({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              indexNumber: doc.data().indexNumber,
              rank: doc.data().rank,
            });
          });
      } else {
        setUserExists(false);
        setUserValues({
          firstName: "",
          lastName: "",
          indexNumber: "",
          rank: "",
        });
      }
    });

    return () => {
      //! cleanup
      unsubscribe();
    };
  }, []);

  return (
    <UserProvider>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path="/"
              render={() => <HomePage userValues={userValues} />}
            />
            <Route
              exact
              path="/signin"
              render={() => (userExists ? <Redirect to="/" /> : <SignIn />)}
            />
            <Route
              exact
              path="/user/:uid"
              render={() => <ProfilePage userValues={userValues} />}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </UserProvider>
  );
};

export default App;
