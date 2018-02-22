import React, {Component} from 'react';
import Message from './Message.jsx';
import Notify from './Notify.jsx';

// loop through messages to pass the props to update Message.jsx

class MessageList extends Component {


  render() {
    return(
        <div>
          <main className="messages">
          {this.props.messages.map( message => {
            if (message.type === "incomingMessage") {
              return <Message userName={message.username} content={message.content} key={message.id} />
            } else {
              return <Notify key={message.id} content={message.content}/>
            }
          })
        }
          </main>
        </div>
    )
  }
}

  export default MessageList





