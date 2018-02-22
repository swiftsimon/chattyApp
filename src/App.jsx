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
      countUsers:"",
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
      console.log("message data", displayData)
      const messages = [...this.state.messages, displayData];
      this.setState({messages: messages, countUsers: displayData.countUsers})
    }
  }


  componentWillUnmount() {
    if(this.socket){
      this.socket.close();
    }
  }


  render() {

    return (
      <div>
        <Nav number={this.state}/>
        <MessageList messages={this.state.messages} />
        <ChatBar onUsernameChange={this._handleUsernameChange}
                 onMessageSubmit={this._handleMessageSubmit} />
       </div>
    );
  }

  _handleUsernameChange = (newUsername) => {
    const message = {
      type: 'postNotification',
      content: `${this.state.currentUser} has change their name to ${newUsername}.`,
      countUsers: this.state.countUsers,
    }
    this.setState({ currentUser: newUsername}, () => {
      this.sendMessageToServer(message)
    })
  }

  _handleMessageSubmit = (content) => {
    const message = {
      type: 'postMessage',
      username: this.state.currentUser,
      countUsers: this.state.countUsers,
      content
    }
    this.sendMessageToServer(message)
  }

  sendMessageToServer = (state) => {
    const incomingMessage = state
    this.socket.send(JSON.stringify(incomingMessage));
  }
}


export default App;
