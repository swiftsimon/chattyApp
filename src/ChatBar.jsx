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
        onChange={this._nameChanged}
        onKeyPress={event => {
          if (event.key === "Enter") {
            this._submitChange();
          }
        }}
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

_nameChanged = event => {
  this.setState({
    username: event.target.value
  })
}

  _inputChanged = event => {
    this.setState({
      content: event.target.value,
      });
};

  _submitChange = () => {
    this.props.update(this.state);
    this.setState({
      content:''
    })
  };

}

  export default ChatBar;