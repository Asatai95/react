import React from 'react';

export default class Search extends React.Component {
    render() {
      return (
        <div className="selectBOX">
          <div className="date">
            <span>日付</span>
            <input
                type="text" name="start_date"
                placeholder="20XX-XX-XX"
                onSelect={this.props.searchItem}
            />
            <span>〜</span>
            <input
                type="text" name="end_date"
                placeholder="20XX-XX-XX"
                onSelect={this.props.searchItem}
            />
          </div>
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