import React, { Component } from 'react';
import "../sidebar.css";
import { Link } from 'react-router-dom';

class Usertab extends Component {
  render() {
    return (
        <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/edit" className="nav-link">
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </Link>
            </li>
        </ul>
    );
  }
}

export default Usertab;