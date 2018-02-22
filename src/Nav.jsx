
import React, {Component} from 'react';



class Nav extends Component {

render() {
      console.log("Nav props", this.props.number)

  return(
    <div>
     <nav className="navbar">
        <a href="/" className="navbar-brand">Lets Chat!</a>
        <div className="navnumber">
            {this.props.number.countUsers + ' users in room'}
          </div>
      </nav>
    </div>
    )
  };
}

  export default Nav