import React from 'react';
import CSRFToken from '../../csrftoken';

export default class Check extends React.Component {
  render() {
    return (
      <form id="post-data" onSubmit={this.props.handleSubmit}>
        <CSRFToken />
        <div className="field">
          <div className="control">
            <p>{this.props.username}</p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <p>{this.props.email}</p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <p>{this.props.password}</p>
          </div>
        </div>
        <div className="register_button_box">
            <input
                className="button is-fullwidth .bg-light is-outlined register"
                type="button"
                value="BACK"
            />
            <input
                className="button is-fullwidth is-primary is-outlined register"
                type="submit"
                value="SUBMIT"
            />
        </div>
      </form>
    );
  }
}
