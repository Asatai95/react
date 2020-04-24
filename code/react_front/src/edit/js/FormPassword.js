import React, { Component } from 'react';
import '../edit.css';
import CSRFToken from '../../csrftoken';

export default class FormPassword extends Component {
    render(){
        return (
            <form className="update_form_pass">
                <CSRFToken />
                <div className="row password_update">
                    <div className="col-md-9">
                        <div className={`form-group bmd-form-group ${this.props.password !== ""? 'is-filled': ''}`} id="password_field">
                            <label className="bmd-label-floating">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password(*必須)"
                                value={this.props.password}
                                onChange={this.props.handleChange}
                                onClick={this.props.handleClick}
                                onBlur={this.props.onBlurFunc}
                            />
                        </div>
                        {this.props.password_error && (
                            <p className="error edit_form">{this.props.password_error}</p>
                        )}
                    </div>
                    <div className="password_view_bt">
                        <button type="button" className="change_bt password" onClick={this.props.passChangebt}>確認</button>
                    </div>
                </div>
                <div className="row password_update">
                    <div className="col-md-9">
                        <div className={`form-group bmd-form-group ${this.props.password_check !== ""? 'is-filled': ''}`} id="password_check_field">
                            <label className="bmd-label-floating">Password Check</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password_check"
                                id="password_check"
                                placeholder="Password Check(*必須)"
                                value={this.props.password_check}
                                onChange={this.props.handleChange}
                                onClick={this.props.handleClick}
                                onBlur={this.props.onBlurFunc}
                            />
                        </div>
                        {this.props.password_check_error && (
                            <p className="error edit_form">{this.props.password_check_error}</p>
                        )}
                    </div>
                    <div className="password_view_bt">
                        <button type="button" className="change_bt password_check" onClick={this.props.passChangebt}>確認</button>
                    </div>
                </div>
                {this.props.detail_error && (
                    <p className="error edit_form">{this.props.detail_error}</p>
                )}
                {this.props.flag && (
                    <button
                        className="btn btn-primary pull-right"
                        type="button"
                        disabled={this.props.flag}
                        onClick={this.props.handlePasswordSubmit}
                    >ERROR</button>
                )}
                {!this.props.flag && (
                    <button
                        className="btn btn-primary pull-right"
                        type="submit"
                        disabled={this.props.flag}
                        onClick={this.props.handlePasswordSubmit}
                    >Update Profile</button>
                )}
                <div className="clearfix"></div>
            </form>
        )
    }
}