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
              onBlur={this.props.onBlurFunc}
            />
          </div>
          {this.props.email_error && (
            <p className="error login_form">{this.props.email_error}</p>
          )}
        </div>
        {this.props.detail_error && (
          <p className="error login_form">{this.props.detail_error}</p>
        )}
        <div className="button_content">
          <div className="back_bt">
              <button type="button" className="backBt button is-outlined is-default" onClick={this.props.onBackbt}>戻る</button>
          </div>
          {this.props.flag && (
            <input
              className="button is-primary is-outlined login"
              type="button"
              value="ERROR"
              disabled={this.props.flag}
            />
          )}
          {!this.props.flag && (
            <input
              className="button is-primary is-outlined login"
              type="submit"
              value="SUBMIT"
              disabled={this.props.flag}
            />
          )}
        </div>
      </form>
    );
  }
}

