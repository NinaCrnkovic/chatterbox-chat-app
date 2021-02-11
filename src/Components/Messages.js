import React from "react";
const uniqueString = require("unique-string");

function Messages({ messages, currentMember }) {
  const renderMessage = (message) => {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "messages-message currentMember"
      : "messages-message";
    return (
      <li className={className} key={uniqueString()}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="messages-list">
      {messages.map((message) => renderMessage(message))}
    </ul>
  );
}

export default Messages;
