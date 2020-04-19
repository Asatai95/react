import React from 'react';
var moment = require("moment");

export default class UserList extends React.Component {
  renderRow() {
    const listItems = this.props.users.map((u) =>
      <tr key={u.id}>
        <td><p>{u.id}</p></td>
        <td>{u.title}</td>
        <td className="message_li">{u.message}</td>
        <td>{moment(u.date_joined).format("YYYY-MM-DD")}</td>
      </tr>
    );
    return(
      listItems
    );
  }
  render() {
    return (
      <div className="tableContent">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Message</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRow()}
          </tbody>
        </table>
      </div>
    );
  }
}
