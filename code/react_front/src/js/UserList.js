import React from 'react';
var moment = require("moment");

export default class UserList extends React.Component {
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
