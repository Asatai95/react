import React, { Component } from 'react';
import CSRFToken from './csrftoken';
import './App.css';
import axios from 'axios';
// import { any } from 'prop-types';
const axiosPost = axios.create({
  xsrfHeaderName: 'X-CSRF-Token',
  withCredentials: true
})

const header = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:3031',
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept",
  "Access-Control-Allow-Credentials": true
}
axios.defaults.withCredentials = true;

class Form extends React.Component {
  render() {
    return (
      <form id="post-data" onSubmit={this.props.handleSubmit}>
        <CSRFToken />
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text" name="name"
              id="name"
              placeholder="Name"
              value={this.props.username}
              onChange={this.props.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={this.props.email}
              onChange={this.props.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className="textarea"
              name="message"
              id="body"
              cols="10"
              rows="3"
              placeholder="Message"
              value={this.props.message}
              onChange={this.props.handleChange}>
            </textarea>
          </div>
        </div>
        <input
          className="button is-fullwidth is-primary is-outlined"
          type="submit"
          value="SEND POST"
        />
      </form>
    );
  }
}

class UserList extends React.Component {
  renderRow() {
    const listItems = this.props.users.map((u) =>
      <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.message}</td>
        <td>{u.created_at}</td>
      </tr>
    );
    return(
      listItems
    );
  }
  render() {
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRow()}
        </tbody>
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersLength: 0,
      name: "",
      email: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'name') {
      this.setState({name: event.target.value});
    }
    else if (event.target.name === 'email') {
      this.setState({email: event.target.value});
    }
    else if (event.target.name === 'message') {
      this.setState({message: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, message } = this.state;
    const conf = {
      'name': name,
      'email': email,
      'message': message
    };

    axiosPost.post("http://localhost:3031/test_api/profile/", conf, header)
    .then(response => {
      this.state.users.unshift(response.data);
      this.setState({
        users: this.state.users,
        usersLength: this.state.users.length,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    axios.get('http://localhost:3031/test_api/profile/list/', header)
    .then(response => {
      console.log("response")
      console.log(response)
      this.setState({
        users: response.data.reverse(),
        usersLength: response.data.length,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="notification">
            This is my react-django app.
          </div>
        </div>
        <div className="column is-6">
          <Form
            name={this.state.name}
            email={this.state.email}
            message={this.state.message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div className="column is-12" id="user-table">
          <p>There are {this.state.usersLength} users.</p>
          <UserList
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default App;