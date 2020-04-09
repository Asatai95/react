import React from 'react';
import CSRFToken from '../../csrftoken';

export default class Check extends React.Component {

  render() {

    return (
      <form id="post-data" className="register_form" onSubmit={this.props.handleSubmit}>
        <CSRFToken />
        <div className="field">
          <div className="control check_user">
            <span className="label_name">ユーザー名</span>
            <p className="value">{this.props.username}</p>
          </div>
        </div>
        <div className="field">
          <div className="control check_user">
            <span className="label_name">メールアドレス</span>
            <p className="value">{this.props.email}</p>
          </div>
        </div>
        <div className="field">
          <div className="control check_user">
            <span className="label_name">パスワード</span>
            <p className="value">{this.props.password}</p>
          </div>
        </div>
        <div className="register_button_box">
            <input
                className="button is-fullwidth bg-light is-outlined register"
                type="button"
                value="BACK"
                onClick={this.props.checkButton}
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
