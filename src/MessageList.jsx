import React, {Component} from 'react';
import Message from './Message.jsx';

// loop through messages to pass the props to update Message.jsx

class MessageList extends Component {


render() {
  return(
    <div>
      <main className="messages">

        {this.props.messages.map((message, index) => {
          // console.log("message HTML", message)

            if (message.type === "incomingMessage") {
                console.log("IF")
              return (
              <Message userName={message.username} content={message.content} key={index} />
              )

            } else {
                console.log("ELSE", message)
                return(
                  <div>
                    <div className="message system">
                      <span className="message-system-notify"> { message.notify } </span>
                    </div>
                  </div>
                )
              }

            }
            )
      }
      </main>
    </div>

  )

  }
}

  export default MessageList





