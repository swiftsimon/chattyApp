
import React, {Component} from 'react';



class Nav extends Component {

render() {

  return(
    <div>

     <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navnumber">
          active users { this.props.number.userCount }
          </div>
      </nav>
    </div>
    )
  };
}

  export default Nav