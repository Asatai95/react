import React, { Component } from 'react';
import './edit.css';

class Edit extends Component {
    constructor(props) {
      super(props);
      this.state = {
          user: "",
      };
    }

    render(){
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Edit Profile</h4>
                                    <p className="card-category">Complete your profile</p>
                                </div>
                                <div className="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-profile">
                            <div className="card-avatar">
                                <a href="/#">
                                    {/* <img className="img" src=""> */}
                                </a>
                            </div>
                            <div className="card-body">
                                <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                                <h4 className="card-title">Alec Thompson</h4>
                                <p className="card-description">
                                    Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                                </p>
                                <a href="/#" className="btn btn-primary btn-round">Follow</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;