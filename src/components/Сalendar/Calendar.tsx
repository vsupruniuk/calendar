import React, { useEffect, useState } from 'react';
import { CalendarDay } from '../CalendarDay';
import  './Calendar.scss';
import classNames from 'classnames';

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

type Props = {
  currentMonth: [number, number]
}

export const Calendar:React.FC<Props> = React.memo(({ currentMonth }) => {
  const [year, month] = currentMonth;
  const [days, setDays] = useState(new Date(year, month, 0).getDate());
  const [startDay, setStartDay] = useState('');
  const currentDay = new Date().toLocaleDateString().split('.');

  const configureDay = (day: number): number => {
    const configuratedDay = new Date(year, month - 1, day);

    return configuratedDay.getDay();
  };

  useEffect(() => {
    setDays(new Date(year, month, 0).getDate());

    const firstDay = configureDay(1);

    setStartDay(daysOfWeek[firstDay].toLowerCase());
  }, [year, month]);

  return (
    <div className={`calendar calendar__start-day--${startDay}`}>
      {Array.from(Array(days + 1).keys()).slice(1).map(day => (
        <div
          className={classNames(
            'calendar__day',
            {
              'calendar__day--current': Number(currentDay[0]) === day
                && Number(currentDay[1]) === month
                && Number(currentDay[2]) === year
            }
          )}
          key={`${day}`}
        >
          <CalendarDay
            dayNumber={daysOfWeek[configureDay(day)]}
            dayOfMonth={day}
          />
        </div>
      ))}
    </div>
  );
});
