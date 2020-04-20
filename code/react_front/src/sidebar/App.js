import React, { Component } from 'react';
import "./sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersLength: 0,
    };

    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event){
      event.preventDefault();
      console.log(event)
      console.log(event.index())
      return false;
  }

  render() {
    return (
        <ul className="nav">
            <li className="nav-item active">
              <a className="nav-link" href="/" onClick={this.state.handleClick}>
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/edit" onClick={this.state.handleClick}>
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </a>
            </li>
        </ul>
    );
  }
}

export default Sidebar;