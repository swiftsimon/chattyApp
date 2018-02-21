import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    // this.handleMessage = this.handleMessage.bind(this);
 }


  //   updateView = (incoming) => {
  //     const updatedMessages = this.state.messages.concat(incoming)
  //     this.setState({messages: updatedMessages})
  // }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
            console.log("connected to server")
    }
    this.socket.onmessage = (event) => {
      let displayData = JSON.parse(event.data);
      console.log("data from server to client", displayData);
      console.log("empty aray", this.state.messages)
      //the ...this pulls in the existing message, then we add displayData
      const messagesNew = [...this.state.messages, displayData]
      console.log("new messages variable", messagesNew, this)
      this.handleMessage(messagesNew);
    }
  }


  handleMessage = (newMessageArray) => {
    this.setState({messages: newMessageArray})
  }

  componentWillUnmount() {
    if(this.socket){
      this.socket.close();
    }
  }


  render() {
    return (<div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} update={this.sendMessageToServer} />
    </div>
    );
  }




  // Send text to all users through the server
sendMessageToServer = (props) => {
  // console.log("this", this.socket)
  // Construct a msg object containing the data the server needs to process the message from the chat client.
  const incomingMessage = props
// console.log("message", incomingMessage)
  // Send the msg object as a JSON-formatted string.
  this.socket.send(JSON.stringify(incomingMessage));

}





}


export default App;










