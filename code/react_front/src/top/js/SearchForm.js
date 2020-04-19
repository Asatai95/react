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
          <div className="searchwordBox">
            <span>検索ワード</span>
            <input
              type="text" name="search"
              id="search"
              className="searchword"
              placeholder="検索ワード"
              onChange={this.props.searchItem}
            />
          </div>
        </div>
      )
    }
}