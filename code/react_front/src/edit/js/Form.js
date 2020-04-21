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
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">Username</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={this.props.username}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        {this.props.username_error && (
                            <p className="error login_form">{this.props.username_error}</p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">Fist Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Fist Name"
                                value={this.props.firstname}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        {this.props.firstname_error && (
                            <p className="error login_form">{this.props.firstname_error}</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">Last Name</label>
                            <input type="text" className="form-control"></input>
                            <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Last Name"
                                value={this.props.lastname}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        {this.props.lastname_error && (
                            <p className="error login_form">{this.props.lastname_error}</p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">Email address</label>
                            <input type="email" className="form-control"></input>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email address"
                                value={this.props.email}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        {this.props.email_error && (
                            <p className="error login_form">{this.props.email_error}</p>
                        )}
                    </div>
                </div>
                {this.props.flag && (
                    <button type="button" className="btn btn-primary pull-right" disabled={this.props.flag}>ERROR</button>
                )}
                {!this.props.flag && (
                    <button type="submit" className="btn btn-primary pull-right" onClick={this.props.handleSubmit} disabled={this.props.flag}>Update Profile</button>
                )}
                {this.props.detail_error && (
                    <p className="error login_form">{this.props.detail_error}</p>
                )}
                <div className="clearfix"></div>
            </form>
        )
    }
}