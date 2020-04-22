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
        var info ;
        if (this.props.info === "preuser"){
            info = "ユーザーを仮登録しました"
        } else if (this.props.info === "authuser"){
            info = "ユーザーを本登録しました"
        } else if (this.props.info === "useredit"){
            info = "情報変更しました"
        } else {
            info = "ログインしてください"
        }
        return(
            <div>
                <PopAPP
                    ref={this.model}
                    item={info}
                    height="-72px"
                    onOpen={() => {}}
                    onClose={() => {}}
                />
            </div>
        );
    }
}
export default POPUPbutton;