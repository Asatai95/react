import React from 'react';
import CSRFToken from '../../csrftoken';

export default class Form extends React.Component {
  render() {
    return (
      <form id="user-data" onSubmit={this.props.handleSubmit}>
        <CSRFToken />
        <div className="fieldblock__login">
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fas fa-user"></i></span>
            </div>
            <input
              className="input form-control"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={this.props.email}
              onChange={this.props.handleChange}
            />
          </div>
          {this.props.email_error && (
            <p className="error login_form">{this.props.email_error}</p>
          )}
        </div>
        <div className="fieldblock__login">
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fas fa-key"></i></span>
            </div>
            <input
              className="input form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.props.password}
              onChange={this.props.handleChange}
            />
          </div>
          {this.props.password_error && (
            <p className="error login_form">{this.props.password_error}</p>
          )}
        </div>
        {this.props.flag && (
          <input
            className="button is-fullwidth is-primary is-outlined login"
            type="submit"
            value="ERROR"
            disabled={this.props.flag}
          />
        )}
        {!this.props.flag && (
          <input
            className="button is-fullwidth is-primary is-outlined login"
            type="submit"
            value="SUBMIT"
            disabled={this.props.flag}
          />
        )}
        {this.props.detail_error && (
          <p className="error login_form">{this.props.detail_error}</p>
        )}
      </form>
    );
  }
}

