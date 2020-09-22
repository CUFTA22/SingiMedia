import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../../assets/SingiLogo.svg";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import Avatar from "@material-ui/core/Avatar";
import "./Header.scss";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../../Providers/UserProvider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import firebase from "firebase";
import { db, storage } from "../../firebase";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  let photoURL, displayName;
  if (user) {
    displayName = user.displayName;
    photoURL = user.photoURL;
  }

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");

  const [openModal, setOpenModal] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleUploadIMG = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUploadPost = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //! progress function ...

        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //! error function

        console.error(error);
        alert(error.message);
      },
      () => {
        //! complete function

        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              title: title,
              imageUrl: url,
              photoURL: photoURL,
              username: displayName,
            });

            setProgress(0);
            setTitle("");
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  const newLocal1 = (
    <div>
      <LinearProgress
        className="addPost-prog"
        variant="determinate"
        value={progress}
      />
      <DialogTitle id="alert-dialog-slide-title">Add Post</DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <TextField
          className="addPost-input"
          type="text"
          label="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          className="addPost-input"
          type="text"
          label="Caption"
          onChange={(event) => setCaption(event.target.value)}
        />
        <label id="addPost-file" htmlFor="upload-photo">
          Browse
        </label>
        <input
          onChange={handleUploadIMG}
          type="file"
          name="photo"
          id="upload-photo"
        />
      </DialogContent>
      <DialogActions>
        <Fab
          size="medium"
          className={classes.margin}
          color="primary"
          aria-label="add"
          onClick={handleUploadPost}
        >
          <AddIcon />
        </Fab>
      </DialogActions>
    </div>
  );

  return (
    <header>
      <Dialog
        className="addPost"
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-slide-title"
      >
        {newLocal1}
      </Dialog>

      <div className="h-left">
        <a href="/">
          <Logo className="h-logo" />
          <span>Singi Media</span>
        </a>
      </div>

      <div className="h-right">
        {user ? (
          <div className="h-right2">
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              className={classes.margin}
              onClick={() => alert("Dugme kinda sus")}
            >
              <SendRoundedIcon />
            </Fab>
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              className={classes.margin}
              onClick={handleOpenModal}
            >
              <AddIcon />
            </Fab>
            <Avatar
              className="h-avatar"
              alt=""
              src={photoURL}
              ref={anchorRef}
              onClick={handleToggle}
            />
            <Popper
              className="popper"
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <Link to={`/user/${user.uid}`}>
                          <MenuItem>Profile</MenuItem>
                        </Link>
                        <MenuItem
                          className="h-logout"
                          onClick={() => auth.signOut()}
                        >
                          Log Out
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        ) : (
          <Link to="/signin">
            <PersonAddRoundedIcon className="h-signIn" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
