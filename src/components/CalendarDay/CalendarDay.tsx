import React from 'react';
import './CalendarDay.scss';

type Props = {
  currentDay: string,
  dayOfMonth: number
}

export const CalendarDay: React.FC<Props> = React.memo(({
  currentDay, dayOfMonth
}) => {
  return (
    <span className="calendar-day__day-info">
      {`${dayOfMonth} ${currentDay}`}
    </span>
  );
});
