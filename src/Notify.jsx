
import React, {Component} from 'react';



class Notify extends Component {

render() {

  return(
    <div>
      <div className="message system">
        <span key={this.props.id} className="message-system-notify">{ this.props.content }</span>
      </div>
    </div>
    )
  };
}

  export default Notify