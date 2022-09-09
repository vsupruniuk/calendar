import React from 'react';
import './CalendarDay.scss';

type Props = {
  dayNumber: string,
  dayOfMonth: number
}

export const CalendarDay: React.FC<Props> = React.memo(({
  dayNumber, dayOfMonth
}) => {
  return (
    <span className="calendar-day__day-info">
      {`${dayOfMonth} ${dayNumber}`}
    </span>
  );
});
