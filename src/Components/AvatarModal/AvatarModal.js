import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import { maleAvatars, femaleAvatars, otherAvatars } from "./avatarArrays";
import { axiosFetch } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  selectAccessToken,
  setUser,
  setUserFinish,
  setUserStart,
} from "../../redux/user/userSlice";

const useStyles = makeStyles((theme) => ({
  esc: {
    color: theme.palette.error.main,
    position: "absolute",
    top: 5,
    right: 5,
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  margin: {
    margin: "0 5px",
  },
}));

const AvatarModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const token = useSelector(selectAccessToken);

  const handleUpdateAvatar = (prop) => {
    axiosFetch
      .post(
        "/user/updateAvatar",
        {
          avatar: prop,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        enqueueSnackbar(`${res.data.message}`, {
          variant: `success`,
        });

        dispatch(setUser({ userInfo: res.data.userInfo }));
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response?.data.message}`, {
          variant: `${err.response?.data.variant}`,
        });
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <IconButton className={classes.esc} onClick={handleClose} color="default">
        <CloseIcon />
      </IconButton>
      <DialogTitle id="alert-dialog-title">{"Male Avatars"}</DialogTitle>
      <DialogContent>
        {maleAvatars.map((name, idx) => (
          <IconButton
            onClick={() => handleUpdateAvatar(name)}
            className={classes.margin}
          >
            <Avatar
              className={classes.avatar}
              key={idx}
              src={require(`../../assets/avatars/${name}.svg`).default}
            />
          </IconButton>
        ))}
      </DialogContent>
      <DialogTitle id="alert-dialog-title">{"Female Avatars"}</DialogTitle>
      <DialogContent>
        {femaleAvatars.map((name, idx) => (
          <IconButton
            onClick={() => handleUpdateAvatar(name)}
            className={classes.margin}
          >
            <Avatar
              className={classes.avatar}
              key={idx}
              src={require(`../../assets/avatars/${name}.svg`).default}
            />
          </IconButton>
        ))}
      </DialogContent>
      <DialogTitle id="alert-dialog-title">{"Other Avatars"}</DialogTitle>
      <DialogContent>
        {otherAvatars.map((name, idx) => (
          <IconButton
            onClick={() => handleUpdateAvatar(name)}
            className={classes.margin}
          >
            <Avatar
              className={classes.avatar}
              key={idx}
              src={require(`../../assets/avatars/${name}.svg`).default}
            />
          </IconButton>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default AvatarModal;
