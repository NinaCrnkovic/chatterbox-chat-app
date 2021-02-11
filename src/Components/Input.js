import React from "react";

class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {
    text: ""
  }
}
onChange(e) {
    this.setState({text: e.target.value});
  }

onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }

render() {
  const {text} = this.state;
    return (
      <div className="input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={text}
            type="text"
            placeholder="Enter your message"
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }

}

export default Input;