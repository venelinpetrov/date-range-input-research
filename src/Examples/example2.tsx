import React, { useState, forwardRef, RefObject, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './example2.css';

interface Props {
  range: [Date, Date | null]
}
const SingleInputRangePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
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

  const ExampleCustomInput = forwardRef<HTMLButtonElement, Props & React.DOMAttributes<HTMLButtonElement>>((props, ref) => {
    return (
      <button className="RangePicker" onClick={() => setOpen(true)} ref={ref}>
        {props.range[0].toLocaleDateString() + ' - ' + props.range[1]?.toLocaleDateString()}
      </button>
    )
  });

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      open={open}
      startDate={startDate}
      endDate={endDate}
      monthsShown={2}
      selectsRange
      onMonthChange={() => console.log(333)}
      customInput={<ExampleCustomInput range={[startDate, endDate]} />}
    />
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
      <input type="text" onBlur={() => console.log('blur')}/>
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


