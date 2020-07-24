import React, { useState, forwardRef, useCallback } from 'react';
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

  const ExampleCustomInput = forwardRef<HTMLButtonElement, Props & React.DOMAttributes<HTMLButtonElement>>((props, ref) => {
    if (props!.range[0] !== null && props!.range[1] !== null) {
      return (
        <button className="RangePicker" onClick={handleOpen} ref={ref}>
          {props.range[0].toLocaleDateString() + ' - ' + props.range[1].toLocaleDateString()}
        </button>
      );
    }

    return (
      <button className="RangePicker" onClick={handleOpen} ref={ref}>
        Start date - End date
      </button>
    );
  });

  return (
    <div>
      <DatePicker
        wrapperClassName="DateRangePickerPopup"
        selected={startDate}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        open={open}
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
        selectsRange
        customInput={<ExampleCustomInput range={[startDate, endDate]} />}
      />
      <button aria-label="clear picker" onClick={handleClear}>X</button>
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
      <input type="text" />
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
