import React, { useState, forwardRef, useCallback, useEffect, useRef } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './example2.css';

type DateOrNull = Date | null;

interface Props {
  range: [DateOrNull, DateOrNull]
}

const SingleInputRangePicker = () => {
  const [startDate, setStartDate] = useState<DateOrNull>(null);
  const [endDate, setEndDate] = useState<DateOrNull>(null);
  const [shouldClose, setShouldClose] = useState(false);

  // any, because the DatePicker is not typed correctly
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formatDate = (d: Date) => moment(d).format('ddd, MMM D, YYYY');

  const handleClear = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  const handleCalendarClose = useCallback(() => setShouldClose(false), []);
  const handleDateSelect = useCallback(() => setShouldClose(true), []);

  const CustomInput = forwardRef<HTMLDivElement, Props & React.DOMAttributes<HTMLButtonElement>>((props, ref) => {
    return (
      <div className="RangePicker" >
        <button className="RangePickerInput" onClick={props.onClick}>
          {props!.range[0] !== null && props!.range[1] !== null ?
            (
              <>
                <span>{formatDate(props.range[0])}</span>
                <span>-</span>
                <span>{formatDate(props.range[1])}</span>
              </>
            ) :
            (
              <>
                <span>Start date</span>
                <span>-</span>
                <span>End date</span>
              </>
            )
          }
        </button>
        <button
          className="RangePickerClearButton"
          aria-label="clear picker"
          onClick={handleClear}>
          X
        </button>
      </div>
    );
  });

  return (
    <div  >
      <DatePicker
        shouldCloseOnSelect={shouldClose}
        wrapperClassName="RangePickerPopup"
        selected={startDate}
        onChange={onChange}
        onSelect={handleDateSelect}
        onCalendarClose={handleCalendarClose}
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
        selectsRange
        customInput={<CustomInput range={[startDate, endDate]} />}
      />
    </div>
  )
};

const TwoInputsRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState<Date | null>(new Date("2014/02/10"));
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};

export const Example2 = () => {
  return (
    <div>
      <h2>One input range picker</h2>
      <SingleInputRangePicker />
      <h2>Two inputs range picker</h2>
      <TwoInputsRangePicker />
    </div>
  );
};
