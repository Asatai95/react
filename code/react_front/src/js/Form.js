import React from 'react';
import CSRFToken from '../csrftoken';

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
              value={this.props.name}
              onChange={this.props.handleChange}
              onBlur={this.props.onBlurFunc}
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
              placeholder="テキスト(200文字以内)"
              value={this.props.message}
              onChange={this.props.handleChange}>
            </textarea>
            {this.props.message_error && (
              <p className="error" style={{ color: 'red', fontSize: 15 }}>{this.props.message_error}</p>
            )}
          </div>
        </div>
        {this.props.flag && (
          <input
            className="button is-fullwidth is-primary is-outlined"
            type="submit"
            value="ERROR"
            disabled={this.props.flag}
          />
        )}
        {!this.props.flag && (
          <input
            className="button is-fullwidth is-primary is-outlined"
            type="submit"
            value="SEND POST"
            disabled={this.props.flag}
          />
        )}
      </form>
    );
  }
}
