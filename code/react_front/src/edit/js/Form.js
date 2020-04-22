import React, { Component } from 'react';
import '../edit.css';
import CSRFToken from '../../csrftoken';

export default class Form extends Component {
    render(){
        return (
            <form>
                <CSRFToken />
                <div className="row">
                    <div className="col-md-9">
                        <div className={`form-group bmd-form-group ${this.props.username !== ""? 'is-filled': ''}`} id="username_field">
                            <label className="bmd-label-floating">Username</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={this.props.username}
                                onChange={this.props.handleChange}
                                onClick={this.props.handleClick}
                                onBlur={this.props.onBlurFunc}
                            />
                        </div>
                        {this.props.username_error && (
                            <p className="error edit_form">{this.props.username_error}</p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className={`form-group bmd-form-group ${this.props.firstname !== ""? 'is-filled': ''}`} id="firstname_field">
                            <label className="bmd-label-floating">Fist Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Fist Name"
                                value={this.props.firstname}
                                onChange={this.props.handleChange}
                                onClick={this.props.handleClick}
                                onBlur={this.props.onBlurFunc}
                            />
                        </div>
                        {this.props.firstname_error && (
                            <p className="error edit_form">{this.props.firstname_error}</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <div className={`form-group bmd-form-group ${this.props.lastname !== ""? 'is-filled': ''}`} id="lastname_field">
                            <label className="bmd-label-floating">Last Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Last Name"
                                value={this.props.lastname}
                                onChange={this.props.handleChange}
                                onClick={this.props.handleClick}
                                onBlur={this.props.onBlurFunc}
                            />
                        </div>
                        {this.props.lastname_error && (
                            <p className="error edit_form">{this.props.lastname_error}</p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <div className={`form-group bmd-form-group ${this.props.email !== ""? 'is-filled': ''}`} id="email_field">
                            <label className="bmd-label-floating">Email address</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email address"
                                value={this.props.email}
                                onChange={this.props.handleChange}
                                onClick={this.props.handleClick}
                                onBlur={this.props.onBlurFunc}
                            />
                        </div>
                        {this.props.email_error && (
                            <p className="error edit_form">{this.props.email_error}</p>
                        )}
                    </div>
                </div>
                {this.props.flag && (
                    <input
                        className="btn btn-primary pull-right"
                        type="submit"
                        value="ERROR"
                        disabled={this.props.flag}
                    />
                )}
                {!this.props.flag && (
                    <button
                        className="btn btn-primary pull-right"
                        type="submit"
                        value="Update Profile"
                        disabled={this.props.flag}
                        onSubmit={this.props.handleSubmit}
                    ></button>

                )}
                {/* <input
                        className="btn btn-primary pull-right"
                        type="submit"
                        value="Update Profile"
                        disabled={this.props.flag}
                    /> */}
                {this.props.detail_error && (
                    <p className="error edit_form">{this.props.detail_error}</p>
                )}
                <div className="clearfix"></div>
            </form>
        )
    }
}