import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
      super(props);

      this.state = {id: "" , username: "", content: ""};
};


render() {
  return(
  <footer className="chatbar">
    <input className="chatbar-username"
        value={this.props.currentUser}
        placeholder="Your Name (Optional)"
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

  _inputChanged = event => {
    this.setState({
      content: event.target.value,
      username: this.props.currentUser,
      id: Math.floor(Math.random() * 1000000000000) });
  };

  _submitChange = () => {
    this.props.update(this.state);
  };

}

  export default ChatBar;