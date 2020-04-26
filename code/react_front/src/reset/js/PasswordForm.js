import React from 'react';
import CSRFToken from '../../csrftoken';

export default class Form extends React.Component {
  render() {
    return (
      <form id="user-data" onSubmit={this.props.handleSubmit}>
        <CSRFToken />
        <div className="fieldblock__password_reset">
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
              onBlur={this.props.onBlurFunc}
            />
            <span className="change_bt password" onClick={this.props.passChangebt}>確認</span>
          </div>
          {this.props.password_error && (
            <p className="error login_form">{this.props.password_error}</p>
          )}
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fas fa-key"></i></span>
            </div>
            <input
              className="input form-control"
              type="password"
              name="password_check"
              id="password_check"
              placeholder="Password Check"
              value={this.props.password_check}
              onChange={this.props.handleChange}
              onBlur={this.props.onBlurFunc}
            />
            <span className="change_bt password_check" onClick={this.props.passChangebt}>確認</span>
          </div>
          {this.props.password_error && (
            <p className="error login_form">{this.props.password_check_error}</p>
          )}
          {this.props.detail_error && (
            <p className="error login_form">{this.props.detail_error}</p>
          )}
        </div>
        {this.props.flag && (
          <input
            className="button is-primary is-outlined is-fullwidth login"
            type="button"
            value="ERROR"
            disabled={this.props.flag}
          />
        )}
        {!this.props.flag && (
          <input
            className="button is-primary is-outlined is-fullwidth password_reset_form"
            type="submit"
            value="SUBMIT"
            disabled={this.props.flag}
          />
        )}
      </form>
    );
  }
}

