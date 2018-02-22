import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notify from './Notify.jsx';
import Nav from './Nav.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: "new user", // optional. if currentUser is not defined, it means the user is Anonymous
      prevUser: "",
      messages: [],
      userCount:"",
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
    // incoming message is a string, so turn it back into an object
      let displayData = JSON.parse(event.data);
      // console.log("FROM SERVER", displayData)

      switch(displayData.type) {
        case "incomingMessage":
          //
          console.log("incoming message user", this.state.currentUser)

        const messagesNew = [...this.state.messages, displayData]
        console.log("new messages variable", messagesNew)
        this.setState({messages: messagesNew, currentUser: displayData.username})
        console.log("updated user", this.state.currentUser)

          break;

        case "incomingNotification":

            console.log("notification on APP old user", this.state)
                  // handleNameChange(this.state.currentUser);
                  let prevUser = this.state.currentUser
            const notifyNew = [...this.state.messages, displayData]

             this.setState({messages: notifyNew, currentUser: displayData.username, prevUser: prevUser})
             console.log("new state new user ", this.state.currentUser)
          //
          break;

          case "userUpdate":

            // console.log("Update Number received in APP", displayData.countUsers)
            this.setState({userCount: displayData.countUsers})
            // console.log("new state with numbers", this.state)

            // const notifyNew = [...this.state.messages, displayData]
            // console.log("new state", notifyNew)
            //  this.setState({})

        default:
          // throw new Error("Unknown type " + displayData.type);
      }


    // check if message content is empty, prevent displaying an empty message
      // if (displayData.content !== '') {

      //the ...this pulls in the existing message, then we add displayData
      // }
    }
  }


  // handleMessage = (newMessageArray) => {
  //   this.setState({messages: newMessageArray})
  // }

  componentWillUnmount() {
    if(this.socket){
      this.socket.close();
    }
  }

  // handleNameChange = (name) => {
  //   let prevUser = name
  // }


  render() {

    return (<div>
        <Nav number={this.state}/>
        <MessageList messages={this.state.messages} olduser={this.state.prevUser}/>
        <ChatBar update={this.sendMessageToServer} />
    </div>
    );
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










