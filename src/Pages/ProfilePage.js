import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import "./ProfilePage.scss";
import ProfilePosts from "../Components/Posts/ProfilePosts";
import { Link, useParams } from "react-router-dom";
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
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";
import BurstModeSharpIcon from "@material-ui/icons/BurstModeSharp";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import PetsIcon from "@material-ui/icons/Pets";
import InstagramIcon from "@material-ui/icons/Instagram";
import { auth, storage, db } from "../firebase";
import InstagramEmbed from "react-instagram-embed";

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
    width: "100%",
    height: "200px",
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
  const [openModalIG, setOpenModalIG] = useState(false);

  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(displayName);
  const [mail, setMail] = useState(email);
  const [igLink, setIgLink] = useState("");

  let { uid } = useParams();

  const { rank, firstName, lastName, igPostLink } = props.userValues;

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpen(false);
  };

  const handleOpenModalIG = () => {
    setOpenModalIG(true);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalIG(false);
  };

  const handleUploadIMG = (e) => {
    console.log(image);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdateIMG = () => {
    if (image) {
      const uploadTask = storage.ref(`imagesUser/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //! progress function ...
        },
        (error) => {
          //! error function
          setOpenError(true);
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
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    if (mail) {
      auth.currentUser
        .updateEmail(mail)
        .then(setOpen(true))
        .catch(() => setOpenError(true));
    } else {
      setOpenError(true);
    }
  };

  const handleUpdateIGPost = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(`${uid}`)
      .update({
        igPostLink: igLink,
      })
      .then(() => {
        setIgLink("");
        setOpen(true);
      })
      .catch(setOpenError(true));
  };

  const handleUpdateUsername = (e) => {
    e.preventDefault();
    if (username) {
      auth.currentUser
        .updateProfile({
          displayName: username,
        })
        .then(setOpen(true))
        .catch(() => setOpenError(true));
    } else {
      setOpenError(true);
    }
  };

  const handleDeleteProfile = (e) => {
    e.preventDefault();

    auth.currentUser.delete();

    db.collection("users").doc(`${uid}`).delete();
  };

  const newLocal2 = (
    <div>
      <LinearProgress
        color="secondary"
        className="updateProf-prog"
        variant="determinate"
        value={image ? 100 : 0}
      />
      <DialogTitle id="alert-dialog-slide-title">Update Profile</DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <div className="updateProf-img">
          <label id="updateProf-file" htmlFor="upload-photo">
            <Avatar
              variant="circle"
              alt={firstName + " " + lastName + "'s profile avatar"}
              src={photoURL}
              className={classes.large}
            />
          </label>
          <input
            onChange={handleUploadIMG}
            type="file"
            name="photo"
            id="upload-photo"
          />
          <Fab
            id="handleUploadImage"
            size="medium"
            className={classes.margin}
            color="primary"
            aria-label="add"
            onClick={handleUpdateIMG}
          >
            <CheckIcon />
          </Fab>
        </div>
        <div className="updateProf-line">
          <TextField
            className="updateProf-input"
            value={username || ""}
            type="text"
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Fab
            size="medium"
            className={classes.margin}
            color="primary"
            aria-label="add"
            onClick={handleUpdateUsername}
          >
            <CheckIcon />
          </Fab>
        </div>
        <div className="updateProf-line">
          <TextField
            className="updateProf-input"
            value={mail || ""}
            type="text"
            label="Email"
            onChange={(event) => setMail(event.target.value)}
          />
          <Fab
            size="medium"
            className={classes.margin}
            color="primary"
            aria-label="add"
            onClick={handleUpdateEmail}
          >
            <CheckIcon />
          </Fab>
        </div>
      </DialogContent>
    </div>
  );

  const newLocal3 = (
    <div>
      <LinearProgress
        color="secondary"
        className="updateProf-prog"
        variant="determinate"
        value={100}
      />
      <DialogTitle id="alert-dialog-slide-title">
        Add Instagram Post
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <TextField
          className="updateProf-input"
          value={igLink}
          type="text"
          label="Instagram Post Link"
          onChange={(event) => setIgLink(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Fab
          size="medium"
          className={classes.margin}
          color="primary"
          aria-label="add"
          onClick={handleUpdateIGPost}
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
      <Dialog
        className="updateProf"
        open={openModalIG}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-slide-title"
      >
        {newLocal3}
      </Dialog>

      <div className="profilePage-top">
        <div className="profilePage-top-left">
          <Link to="/">
            <Button className="back-btn" startIcon={<ArrowBackIosIcon />}>
              Go back
            </Button>
          </Link>
        </div>
        {uid === uidLocal ? (
          <div className="profilePage-top-right">
            <Button
              onClick={handleOpenModalIG}
              className="ig-btn"
              startIcon={<InstagramIcon />}
            >
              Add IG post
            </Button>
            <SettingsIcon
              className="profile-editCog"
              onClick={handleOpenModal}
            />
          </div>
        ) : null}
      </div>
      <div className="profilePage-main">
        <div className="profilePage-main-left">
          <Avatar
            variant="square"
            alt={firstName + " " + lastName + "'s profile avatar"}
            src={photoURL}
            className={classes.large}
          />
          <div className="profilePage-main-left-name">
            <p>{displayName}</p>
            <p className="profilePage-main-left-rank">{rank}</p>
          </div>
          <div className="profilePage-main-left-options">
            <div>
              <Button
                className="back-btn-pst"
                startIcon={<BurstModeSharpIcon />}
              >
                Posts
              </Button>
              <Button className="back-btn-pst" startIcon={<PetsIcon />}>
                Dancing Cat
              </Button>
            </div>
            <div>
              <Button
                onClick={handleDeleteProfile}
                className="back-btn-lgt"
                startIcon={<DeleteForeverRoundedIcon />}
              >
                Delete User
              </Button>
              <Button
                onClick={() => auth.signOut()}
                className="back-btn-lgt"
                startIcon={<ClearSharpIcon />}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
        <div className="profilePage-main-mid">
          <div className="profilePage-main-mid-head">
            <div className="profilePage-main-mid-head-left"></div>
            <div className="profilePage-main-mid-head-right"></div>
          </div>
          <ProfilePosts displayName={displayName} />
        </div>
        <div className="profilePage-main-right">
          {igPostLink ? (
            <InstagramEmbed
              url={igPostLink}
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => <div>No post added</div>}
            />
          ) : user ? (
            <div>Click on button above to add post</div>
          ) : null}
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error updating profile!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfilePage;
