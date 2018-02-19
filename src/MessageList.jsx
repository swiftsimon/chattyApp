import React, {Component} from 'react';
import Message from './Message.jsx';

// loop through messages to pass the props to update Message.jsx

class MessageList extends Component {


render() {
  return(
    <div>
      <main className="messages">
        {this.props.messages.map((message, index) => {
            return (
              <Message userName={message.username} content={message.content} key={message.id} />
            )
          })
        }
      </main>
    </div>
  )}

}

  export default MessageList





