import React, {Component} from 'react';
import Message from './Message.jsx';

// loop through messages to pass the props to update Message.jsx

class MessageList extends Component {


render() {
  return(
    <div>
      <main className="messages">

        {this.props.messages.map((message, index) => {


            if (message.type === "incomingMessage") {

              return (
              <Message userName={message.username} content={message.content} key={index} />
              )

            } else {


                return(
                  <div>
                    <div className="message system">
                      <span className="message-system-notify"> { this.props.olduser + message.notify } </span>
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





