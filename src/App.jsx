import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notify from './Notify.jsx';
import Nav from './Nav.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: "new user",
      messages: [],
      userCount:"",
    };

 }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
            console.log("connected to server")
    }
    this.socket.onmessage = (event) => {
    // incoming message is a string, so turn it back into an object
      let displayData = JSON.parse(event.data);
      const messages = [...this.state.messages, displayData];
      this.setState({messages})
    }
  }


  componentWillUnmount() {
    if(this.socket){
      this.socket.close();
    }
  }


  render() {

    return (<div>
        <Nav number={this.state}/>
        <MessageList messages={this.state.messages} olduser={this.state.prevUser}/>
        <ChatBar onUsernameChange={this._handleUsernameChange} onMessageSubmit={this._handleMessageSubmit} />
    </div>
    );
  }

  _handleUsernameChange = (newUsername) => {
    const message = {
      type: 'postNotification',
      content: `${this.state.currentUser} has change their name to ${newUsername}.`
    }
    this.setState({ currentUser: newUsername }, () => {
      this.sendMessageToServer(message)
    })

  }

  _handleMessageSubmit = (content) => {
    const message = {
      type: 'postMessage',
      username: this.state.currentUser,
      content
    }
    this.sendMessageToServer(message)
  }
  // Send text to all users through the server
  sendMessageToServer = (state) => {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
    const incomingMessage = state
    // console.log("send message to server from APP", incomingMessage)
  // Send the msg object as a JSON-formatted string.
    this.socket.send(JSON.stringify(incomingMessage));

  }
}


export default App;
