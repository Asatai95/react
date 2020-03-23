import React, {forwardRef, useState} from 'react';
import DatePicker, { registerLocale } from 'react-datepicker'
import {userList} from "./Config";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja'
import { updateExpression } from '@babel/types';
registerLocale('ja', ja);

export const LocalDatePicker = () => {

    const ExampleCustomInput = forwardRef(({ onClick, value }, ref) => (
        <button ref={ref} className="example-custom-input" onClick={onClick}>
            {value}
        </button>
    ));
    const ref = React.createRef();

    var date_db;
    console.log(userList())
    date_db = userList()
    if (date_db !== undefined){
        const [startDate, setStartDate] = useState(date_list[0]);
        const [endDate, setEndDate] = useState(date_list[date_list.length]);
    } else {
        const [startDate, setStartDate] = useState(new Date());
        var date_last = new Date()
        date_last.setDate(date_last.getDate() + 3)
        const [endDate, setEndDate] = useState(date_last)
    }

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

