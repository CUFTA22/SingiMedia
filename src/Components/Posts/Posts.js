import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Post from "../Post/Post";
import "./Posts.scss";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="posts">
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

export default Posts;
