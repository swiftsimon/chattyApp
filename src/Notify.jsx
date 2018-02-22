
import React, {Component} from 'react';



class Notify extends Component {

render() {

  return(
    <div>
      <div className="message system">
        <span className="message-system-notify"> notify { this.props.notify }</span>

      </div>
    </div>
    )
  };
}

  export default Notify