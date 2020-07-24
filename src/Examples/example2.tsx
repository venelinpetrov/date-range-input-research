import React, { useState, forwardRef, useCallback, useEffect, useRef } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './example2.css';

const ESK_KEY = 27;

type DateOrNull = Date | null;

interface Props {
  range: [DateOrNull, DateOrNull]
}

const SingleInputRangePicker = () => {
  const [startDate, setStartDate] = useState<DateOrNull>(null);
  const [endDate, setEndDate] = useState<DateOrNull>(null);
  const [open, setOpen] = useState(false);

  // any, because the DatePicker is not typed correctly
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end !== null) {
      setOpen(false);
    }
  };

  const formatDate = (d: Date) => moment(d).format('ddd, MMM D, YYYY');

  const handleClear = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === ESK_KEY) {
      setOpen(false);
    }
  }, []);

  const handleOpen = useCallback(() => setOpen(true), []);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler, false);
    return () => document.removeEventListener('click', handler);
  }, [ref]);
  const ExampleCustomInput = forwardRef<HTMLDivElement, Props & React.DOMAttributes<HTMLDivElement>>((props, ref) => {
    return (
      <div className="RangePicker" ref={ref}>
        <button className="RangePickerInput"  onClick={handleOpen}>
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
    <div >
      <DatePicker

        wrapperClassName="RangePickerPopup"
        selected={startDate}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        open={open}
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
        selectsRange
        customInput={<ExampleCustomInput ref={ref} range={[startDate, endDate]} />}
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
