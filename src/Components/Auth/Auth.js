import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosFetch } from "../../axios";
import {
  setUser,
  setUserFinish,
  setUserStart,
} from "../../redux/user/userSlice";

const Auth = () => {
  const dispatch = useDispatch();

  const checkAuth15min = () => {
    setTimeout(() => {
      console.log("Silent Auth");
      axiosFetch
        .post("/auth/checkAuth")
        .then((res) => {
          dispatch(
            setUser({
              accessToken: res.data.accessToken,
              userInfo: res.data.userInfo,
            })
          );
        })
        .catch(() => {
          console.log("Silent auth failed");
        });

      checkAuth15min();
    }, 840000);
  };

  // On every refresh
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

  // Silent Auth
  useEffect(() => {
    checkAuth15min();
  }, [checkAuth15min]);

  return null;
};

export default Auth;
