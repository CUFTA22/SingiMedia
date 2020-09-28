import React, { useState, useEffect } from "react";
import "./HPRight.scss";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { db } from "../../firebase";

const NewsArt = ({ id, imgUrl, text }) => {
  return (
    <article key={id}>
      <img src={imgUrl} alt="Singi media news article" />
      <p>{text}</p>
    </article>
  );
};

const HPRight = () => {
  const [avatarGroup, setAvatarGroup] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setAvatarGroup(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  const articles = [
    {
      id: 1,
      imgUrl: require("../../assets/SingiLogo.svg"),
      text: "Official release of the app, 22.09.2020",
    },
  ];

  return (
    <div className="hpright">
      <h2>News</h2>
      <Divider className="hpright-line" />
      <div>
        {articles.map((article) => (
          <NewsArt
            key={article.id}
            imgUrl={article.imgUrl}
            text={article.text}
          />
        ))}
      </div>
      <h2>People</h2>
      <Divider className="hpright-line" />
      <div className="hpright-avatars">
        <AvatarGroup max={4}>
          {avatarGroup.map((avatar) => (
            <Avatar
              key={avatar.id}
              alt={avatar.post.displayName}
              src={avatar.post.photoURL}
            />
          ))}
        </AvatarGroup>
        <span>{avatarGroup.length} user/s total</span>
      </div>
    </div>
  );
};

export default HPRight;
