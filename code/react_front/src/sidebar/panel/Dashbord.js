import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../sidebar.css";
import App from '../../top/App';
import Edit from "../../edit/App";
import Cookies from 'js-cookie';

const Loading = (info) => {
  var obj = document.getElementById("loading");
  obj.classList.add("active");
  var element = document.getElementById('loading');
  element.innerHTML = '<div id="loadicon" class="loader"></div>'
  const item =  () => {
      obj.classList.remove("active");
      if (info === "dash") {
        window.history.replaceState('','','/');
        ReactDOM.render(<App />, document.getElementById('root'));
      } else if (info === "edit") {
        window.history.replaceState('','','/edit');
        ReactDOM.render(<Edit />, document.getElementById('root'));
      }
  }
  setTimeout(item, 600);
}

const tabaction = (id) => {
  var items = document.getElementsByClassName("nav-item");
  for (var i = 0; i < items.length; i++){
    if (items[i].classList.contains("active") === true){
      items[i].classList.remove("active");
    }
  }

  var itemclass_id = document.getElementById(""+id+"_id");
  itemclass_id.classList.add("active");
}

class Dashtab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
    this.handleClick = this.handleClick.bind();
  }

  componentDidMount(){
    var tab = Cookies.get("tab")
    console.log("tab")
    if (tab !== undefined){
      tabaction(tab);
      if (tab === "dash") {
        window.history.replaceState('','','/');
        ReactDOM.render(<App />, document.getElementById('root'));
      } else if (tab === "edit") {
        window.history.replaceState('','','/edit');
        ReactDOM.render(<Edit />, document.getElementById('root'));
      }
    }
  }

  handleClick(event){
    event.preventDefault();
    var id = event.target.id;
    if (id === "da"){ id = "dash"} else if (id === "ed") { id = "edit"}
    tabaction(id);
    Cookies.set('tab', id)
    Loading(id);
  }

  render() {
    return (
        <ul className="nav">
            <li className="nav-item active" id="dash_id">
              <a href="/" className="nav-link" id="dash" onClick={this.handleClick}>
                <i className="material-icons">dashboard</i>
                <p id="da" onClick={this.handleClick}>Dashboard</p>
              </a>
            </li>
            <li className="nav-item edit" id="edit_id">
              <a href="/edit" className="nav-link" id="edit" onClick={this.handleClick}>
                <i className="material-icons">person</i>
                <p id="ed" onClick={this.handleClick}>User Profile</p>
              </a>
            </li>
        </ul>
    );
  }
}

export default Dashtab;