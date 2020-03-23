import React from 'react';
import {LocalDatePicker} from "./Date";
export default class Search extends React.Component {
    render() {
      return (
        <div className="selectBOX">
          <LocalDatePicker />
          <span>/</span>
          <div className="username">
            <span>ユーザー名</span>
            <input
              className="input"
              type="text" name="username"
              id="search"
              placeholder="username"
              onChange={this.props.searchItem}
            />
          </div>
        </div>
      )
    }
}