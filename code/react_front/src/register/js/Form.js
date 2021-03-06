import React from 'react';
import CSRFToken from '../../csrftoken';

export default class Form extends React.Component {
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
              onBlur={this.props.onBlurFunc}
            />
            {this.props.username_error && (
              <p className="error register" style={{ color: 'red', fontSize: 15 }}>{this.props.username_error}</p>
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
              onBlur={this.props.onBlurFunc}
            />
            {this.props.email_error && (
              <p className="error register" style={{ color: 'red', fontSize: 15 }}>{this.props.email_error}</p>
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
              <p className="error register" style={{ color: 'red', fontSize: 15 }}>{this.props.password_error}</p>
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
              <p className="error register" style={{ color: 'red', fontSize: 15 }}>{this.props.password_check_error}</p>
            )}
          </div>
        </div>
        <div className="register_button_box">
            <input
                className="button is-fullwidth bg-light is-outlined register"
                type="button"
                value="BACK"
                onClick={this.props.backbt}
            />
            {this.props.flag && (
            <input
                className="button is-fullwidth is-primary is-outlined register"
                type="button"
                value="ERROR"
                disabled={this.props.flag}
            />
            )}
            {!this.props.flag && (
            <input
                className="button is-fullwidth is-primary is-outlined register"
                type="button"
                value="CHECK"
                disabled={this.props.flag}
                onClick={this.props.checkButton}
            />
            )}
        </div>
      </form>
    );
  }
}
