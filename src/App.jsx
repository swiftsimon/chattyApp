import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: '22'
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: '33'
    }
  ]}
 }


    updateView = (incoming) => {
      const updatedMessages = this.state.messages.concat(incoming)
      this.setState({messages: updatedMessages})
  }



  render() {
    return (<div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} update={this.updateView} />
    </div>
    );
  }

componentDidMount() {

  this.socket = new WebSocket("ws://localhost:3001/");
    console.log("new client connection", this.socket)
}





}


export default App;










