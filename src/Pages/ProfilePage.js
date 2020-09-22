import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import "./ProfilePage.scss";
import { useParams } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import CheckIcon from "@material-ui/icons/Check";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from "@material-ui/core/Fab";
import Slide from "@material-ui/core/Slide";
import { auth, storage } from "../firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

const ProfilePage = (props) => {
  const classes = useStyles();

  const user = useContext(UserContext);

  let uidLocal, displayName, email, photoURL;
  if (user) {
    displayName = user.displayName;
    uidLocal = user.uid;
    email = user.email;
    photoURL = user.photoURL;
  }
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(displayName);
  const [mail, setMail] = useState(email);

  let { uid } = useParams();

  const { rank, firstName, lastName } = props.userValues;

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUploadIMG = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdateProfile = () => {
    if (username) {
      auth.currentUser
        .updateProfile({
          displayName: username,
        })
        .then(setOpen(true))
        .catch(() => {
          setOpenError(true);
        });
    }
    if (image) {
      const uploadTask = storage.ref(`imagesUser/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //! progress function ...
        },
        (error) => {
          //! error function
          alert(error);
        },
        () => {
          //! complete function

          storage
            .ref("imagesUser")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              auth.currentUser
                .updateProfile({
                  photoURL: url,
                })
                .then(function () {
                  setOpen(true);
                })
                .catch(function () {
                  setOpenError(true);
                });

              setOpenModal(false);
              setImage(null);
            });
        }
      );
    }

    if (mail) {
      auth.currentUser
        .updateEmail(mail)
        .then(setOpen(true))
        .catch(() => setOpenError(true));
    }
  };

  const newLocal2 = (
    <div>
      <LinearProgress
        className="updateProf-prog"
        variant="determinate"
        value={image ? 100 : 0}
      />
      <DialogTitle id="alert-dialog-slide-title">Update Profile</DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <TextField
          className="updateProf-input"
          value={username || ""}
          type="text"
          label="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          className="updateProf-input"
          value={mail || ""}
          type="text"
          label="Email"
          onChange={(event) => setMail(event.target.value)}
        />
        <div className="updateProf-img">
          <label id="updateProf-file" htmlFor="upload-photo">
            Profile Picture
          </label>
          <input
            onChange={handleUploadIMG}
            type="file"
            name="photo"
            id="upload-photo"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Fab
          size="medium"
          className={classes.margin}
          color="primary"
          aria-label="add"
          onClick={handleUpdateProfile}
        >
          <CheckIcon />
        </Fab>
      </DialogActions>
    </div>
  );

  return (
    <div className="profilePage">
      <Dialog
        className="updateProf"
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-slide-title"
      >
        {newLocal2}
      </Dialog>

      <div className="profilePage-top">
        <div className="profilePage-top-left">
          <Avatar
            alt={firstName + " " + lastName + "'s profile avatar"}
            src={photoURL}
            className={classes.large}
          />
          <div className="profilePage-top-name">
            <h2>{displayName}</h2>
            <p>{rank}</p>
          </div>
        </div>
        <div className="profilePage-top-right">
          {uid === uidLocal ? (
            <SettingsIcon
              className="profile-editCog"
              onClick={handleOpenModal}
            />
          ) : null}
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error updating profile!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfilePage;
