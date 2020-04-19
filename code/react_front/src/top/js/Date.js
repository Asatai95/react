import React, {forwardRef, useState} from 'react';
import DatePicker, { registerLocale } from 'react-datepicker'
import {userList} from "../../assets/Config";

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
    var end_date_item = new Date(Date.parse(date_db.date[list_count - 1]));
    var end_date = end_date_item.getDate() + 1;
    var end_month = end_date_item.getMonth() + 1
    end_date_item = new Date(''+end_date_item.getFullYear()+'/'+end_month+'/'+end_date+'');
    const [startDate, setStartDate] = useState(Date.parse(date_db.date[0]))
    const [endDate, setEndDate] = useState( end_date_item )

    const handleChange = (info, date) => {
        response["handleDateChange"](info, date)
        if (info === "start"){
            setStartDate(date)
        } else {
            setEndDate(date)
        }
    }

    return (
      <div className="date">
        <span>日付</span>
        <DatePicker
            locale="ja"
            selected={startDate}
            onChange={date => handleChange("start", date)}
            dateFormat="yyyy-MM-dd"
            selectsStart
            placeholderText="20XX-XX-XX"
            startDate={startDate}
            endDate={endDate}
            customInput={<ExampleCustomInput />}
        />
        <span>〜</span>
        <DatePicker
            locale="ja"
            selected={endDate}
            onChange={date => handleChange("end", date)}
            dateFormat="yyyy-MM-dd"
            selectsEnd
            placeholderText="20XX-XX-XX"
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            customInput={<ExampleCustomInput ref={ref}/>}
        />
      </div>
    );
}

