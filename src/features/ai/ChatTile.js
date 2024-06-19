import React from "react";
import userIcon from "../../assets/images/user_icon.png";
import aiTutor from "../../assets/images/ai_tutor.png";

const ChatTile = ({ message }) => {
  return (
    <div className={message.isBot ? "chat bot" : "chat"}>
      <img
        className="chatimg"
        src={message.isBot ? aiTutor : userIcon}
        alt=""
      />
      <p className="text">{message.text}</p>
    </div>
  );
};

export default ChatTile;
