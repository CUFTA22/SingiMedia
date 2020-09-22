import React, { useState, useContext, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import firebase from "firebase";
import { UserContext } from "../../Providers/UserProvider";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";

const Post = ({ postId, username, caption, imageUrl, photoURL }) => {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      photoURL: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post-header">
        <div>
          <Avatar className="post-avatar" alt={username} src={photoURL} />
          <h3>{username}</h3>
        </div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => alert("Why u pussy")}>Report</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>See Post</MenuItem>
        </Menu>
      </div>
      <img className="post-image" src={imageUrl} alt="Post" />
      <h4 className="post-text">
        <strong>{username}</strong> {caption}
      </h4>
      <Divider className="hpright-line" />

      <div className="post-comments">
        {comments.map((obj) => (
          <p key={obj.id}>
            <strong>{obj.comment.username}</strong> {obj.comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form>
          <input
            className="post-input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
