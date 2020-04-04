import React, {forwardRef, useState} from 'react';
import DatePicker, { registerLocale } from 'react-datepicker'
import {userList} from "./Config";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja'

registerLocale('ja', ja);

export const LocalDatePicker = (response) => {

    const ExampleCustomInput = forwardRef(({ onClick, value }, ref) => (
        <button ref={ref} className="example-custom-input" onClick={onClick}>
            {value}
        </button>
    ));
    const ref = React.createRef();

    var date_db;
    var list_count;

    date_db = userList(response["respose_item_date"])
    list_count = date_db.date.length;

    const [startDate, setStartDate] = useState(Date.parse(date_db.date[list_count - 1]))
    const [endDate, setEndDate] = useState( Date.parse(date_db.date[0]))

    return (
      <div className="date">
        <span>日付</span>
        <DatePicker
            locale="ja"
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            selectsStart
            isClearable
            placeholderText="20XX-XX-XX"
            startDate={startDate}
            endDate={endDate}
            customInput={<ExampleCustomInput />}
        />
        <span>〜</span>
        <DatePicker
            locale="ja"
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            selectsEnd
            isClearable
            placeholderText="20XX-XX-XX"
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            customInput={<ExampleCustomInput ref={ref}/>}
        />
      </div>
    );
}

