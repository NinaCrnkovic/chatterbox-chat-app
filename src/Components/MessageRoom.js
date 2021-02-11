import React from "react";

import Messages from "./Messages";
import Input from "./Input";
import Random from "../Utility/Random";

class MessageRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: Random.randomName(),
        color: Random.randomColor(),
      },
    };
  }

  componentDidMount() {
    this.drone = new window.Scaledrone("oNsda7Zamue7uVIG", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room1");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room1",
      message,
    });
  };

  render() {
    const {messages, member} = this.state;
    return (
      <div className="app">
        <div className="app-header">
          <h1>Chatterbox</h1>
        </div>
        <Messages
          messages={messages}
          currentMember={member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default MessageRoom;
