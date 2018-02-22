import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
      super(props);

      this.state = {id: "" , type: "", username: "", content: "", notify: ""};
};



render() {
  return(
  <footer className="chatbar">

    <input className="chatbar-username"
        placeholder="Your Name (Optional)"
        onChange={this._nameChanged}
        onKeyPress={event => {
          if (event.key === "Enter") {
            this._submitNameChange();
          }
        }}
      />

    <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onChange={this._inputChanged}
        onKeyPress={event => {
          if (event.key === "Enter") {
            //call function to update message list
            this._submitChange();
            event.target.value = ''; // clear the input field
          }
        }}

      />
  </footer>
  )
}

_nameChanged = (event) => {
  // console.log("event", event)
  let prevUser = this.state.username
  this.setState({
    username: event.target.value,
    type: "postNotification",
    notify: `user ${prevUser} changed name to ${event.target.value}`,
  })
}

  _inputChanged = (event) => {
    this.setState({
      content: event.target.value,
      type: "postMessage"
      });
};

 _submitNameChange = () => {
    this.props.update(this.state);
  };


  _submitChange = () => {
    this.props.update(this.state);
    this.setState({
      content:''
    })
  };

}

  export default ChatBar;