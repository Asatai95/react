import React from 'react';
import {LocalDatePicker} from "./Date";
export default class Search extends React.Component {
    render() {
      console.log(this.props.respose_item_date)
      return (
        <div className="selectBOX">
          { this.props.respose_item_date !== "" && (
            <LocalDatePicker
              respose_item_date={this.props.respose_item_date}
            />
          )}
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