import React, { Component } from 'react';
import '../login.css';
import PopAPP from "../../custom/nav/popup";

class POPUPbutton extends Component {
    constructor(props) {
        super(props);
        this.model = React.createRef();
    }
    onClickShare = () => {
        this.model.current.show()
    }
    componentDidMount(){
        this.onClickShare()
    }

    render() {
        return(
            <div>
                <PopAPP
                    ref={this.model}
                    item="ユーザーを仮登録しました"
                    height="-72px"
                    onOpen={() => {}}
                    onClose={() => {}}
                />
            </div>
        );
    }
}
export default POPUPbutton;