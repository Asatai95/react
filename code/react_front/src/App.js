import React, { Component } from 'react';
import CSRFToken from './csrftoken';
import './App.css';
import axios from 'axios';
import Validation from './Validation';
// import { enumSymbolBody } from '@babel/types';
// import { runInThisContext } from 'vm';
// import moment from "moment";
var moment = require("moment");

const header = {
  'Access-Control-Allow-Origin': 'http://localhost:3031',
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept",
  "Access-Control-Allow-Credentials": true
}
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
              value={this.props.name}
              onChange={this.props.handleChange}
            />
            {this.props.name_error && (
              <p className="error" style={{ color: 'red', fontSize: 15 }}>{this.props.name_error}</p>
            )}
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
            {this.props.email_error && (
              <p className="error" style={{ color: 'red', fontSize: 15 }}>{this.props.email_error}</p>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.props.password}
              onChange={this.props.handleChange}
            />
            {this.props.password_error && (
              <p className="error" style={{ color: 'red', fontSize: 15 }}>{this.props.password_error}</p>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="password"
              name="password_check"
              id="password_check"
              placeholder="Password Check"
              value={this.props.password_check}
              onChange={this.props.handleChange}
            />
            {this.props.password_check_error && (
              <p className="error" style={{ color: 'red', fontSize: 15 }}>{this.props.password_check_error}</p>
            )}
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
            {this.props.message_error && (
              <p className="error" style={{ color: 'red', fontSize: 15 }}>{this.props.message_error}</p>
            )}
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
        <td>{u.username}</td>
        <td>{u.email}</td>
        <td>{u.message}</td>
        <td>{moment(u.date_joined).format("YYYY-MM-DD")}</td>
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
      info: {
        users: [],
        usersLength: 0,
      },
      // loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var value = event.target.value.trim();
    if (event.target.name === 'name') {
      this.setState({
        name: value,
        name_error: Validation.formValidate(event.target.name, value)
      });
    }
    else if (event.target.name === 'email') {
      this.setState({
        email: value,
        email_error: Validation.formValidate(event.target.name, value)
      });
    }
    else if (event.target.name === 'message') {
      this.setState({
        message: value,
        message_error: Validation.formValidate(event.target.name, value)
      });
    }
    else if (event.target.name === 'password') {
      this.setState({
        password: value,
        password_error: Validation.formValidate(event.target.name, value)
      });
      if (this.state.password_check){
        if (this.state.password_check !== event.target.value) {
          if (Validation.formValidate(event.target.name, value) === "") {
            this.setState({
              password: value,
              password_error: "パスワードは確認用と同じ値を入力してください"
            });
          } else {
            this.setState({
              password_error: ""
            });
          }
        }
      }
    }
    else if (event.target.name === 'password_check') {
      this.setState({
        password_check: value,
        password_check_error: Validation.formValidate(event.target.name, event.target.value)
      });
      if (this.state.password){
        if (event.target.value !== this.state.password) {
          if (Validation.formValidate(event.target.name, value) === "") {
            this.setState({
              password_check: value,
              password_check_error: "パスワードは確認用と同じ値を入力してください"
            });
          } else {
            this.setState({
              password_check_error: ""
            });
          }
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, message, password, password_check } = this.state;
    const conf = {
      'username': name,
      'email': email,
      'message': message,
      "password": password,
      "password_check": password_check
    };

    axios.post("http://localhost:3031/test_api/profile/", conf, header)
    .then(response => {
      this.state.users.unshift(response.data);
      this.setState({
        info: {
          users: this.state.users,
          usersLength: this.state.users.length,
        }
      });
    })
    .catch((error) => {
      var label = Object.keys(error.response.data.message)
      var value = error.response.data.message[label]
      label = label + "_error"
      console.log(value)
      console.log(label)
      this.setState({
        label: value,
      });
    });
  }

  componentDidMount() {
    axios.get('http://localhost:3031/test_api/profile/list/')
    .then(response => {
      this.setState({
        info: {
          users: response.data.reverse(),
          usersLength: response.data.length,
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="notification">
            This is my react-django app.
          </div>
        </div>
        <div className="column is-6">
          <Form
            name={this.state.name || ""}
            email={this.state.email || ""}
            password={this.state.password || ""}
            password_check={this.state.password_check || ""}
            message={this.state.message || ""}
            name_error={this.state.name_error || ""}
            email_error={this.state.email_error || ""}
            password_error={this.state.password_error || ""}
            password_check_error={this.state.password_check_error || ""}
            message_error={this.state.message_error || ""}
            handleChange={this.handleChange || ""}
            handleSubmit={this.handleSubmit || ""}
          />
        </div>
        <div className="column is-12" id="user-table">
          <p>There are {this.state.info.usersLength || ""} users.</p>
          <UserList
            users={this.state.info.users || ""}
          />
        </div>
      </div>
    );
  }
}

export default App;