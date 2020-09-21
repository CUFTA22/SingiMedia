import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const AddPostModal = () => {
  const classes = useStyles();
  console.log("munt");
  return (
    <div>
      <DialogTitle id="alert-dialog-slide-title">{"Add Post"}</DialogTitle>
      <DialogContent>Hello</DialogContent>
      <DialogActions>
        <Fab className={classes.root} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </DialogActions>
    </div>
  );
};

export default AddPostModal;
