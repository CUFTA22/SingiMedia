import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Post from "../Post/Post";

export const ProfilePosts = ({ displayName }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .where("username", "==", `${displayName}`)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, [displayName]);

  return (
    <div className="profilePage-main-mid-posts">
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          title={post.title}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
          photoURL={post.photoURL}
        />
      ))}
    </div>
  );
};

export default ProfilePosts;
