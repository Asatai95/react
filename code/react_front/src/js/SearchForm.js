import React from 'react';
import {LocalDatePicker} from "./Date";
export default class Search extends React.Component {
    render() {
      return (
        <div className="selectBOX">
          { this.props.respose_item_date !== "" && (
            <LocalDatePicker
              respose_item_date={this.props.respose_item_date}
              handleDateChange={this.props.handleDateChange}
            />
          )}
          <span>/</span>
          <div className="username">
            <span>ユーザー名</span>
            <input
              type="text" name="username"
              id="search"
              className="searchusername"
              placeholder="username"
              onChange={this.props.searchItem}
            />
          </div>
        </div>
      )
    }
}