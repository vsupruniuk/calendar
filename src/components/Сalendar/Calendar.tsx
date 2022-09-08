import React, { useEffect, useState } from 'react';
import { CalendarDay } from '../CalendarDay';
import  './Calendar.scss';
import { useDate } from '../../hooks/useDate';
import classNames from 'classnames';

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

export const Calendar:React.FC = React.memo(() => {
  const [
    year, month, setDate
  ] = useDate(new Date().getFullYear(), new Date().getMonth() + 1);
  const [days, setDays] = useState(new Date(year, month, 0).getDate());
  const [startDay, setStartDay] = useState('');

  const configureDate = (day: number): number => {
    const configuratedDay = new Date(year, month - 1, day);

    return configuratedDay.getDay();
  };

  useEffect(() => {
    setDays(new Date(year, month, 0).getDate());

    const firstDay = configureDate(1);

    setStartDay(daysOfWeek[firstDay].toLowerCase());
  }, [year, month]);

  const changeDate = (action: string): void => {
    switch (action) {
      case 'increase':
        if (month === 12) {
          setDate(year + 1, 1);
        } else {
          setDate(year, month + 1);
        }

        break;

      case 'decrease':
        if (month === 1) {
          setDate(year - 1, 12);
        } else {
          setDate(year, month - 1);
        }

        break;

      default:
        break;
    }
  };

  return (
    <div className={'calendar'}>
      {Array.from(Array(days + 1).keys()).slice(1).map(day => (
        <div
          className={classNames(
            'calendar__day',
            {
              'calendar__day--start-day-tues': day === 1
                && startDay === 'tues',
              'calendar__day--start-day-wed': day === 1
                && startDay === 'wed',
              'calendar__day--start-day-thurs': day === 1
                && startDay === 'thurs',
              'calendar__day--start-day-fri': day === 1
                && startDay === 'fri',
              'calendar__day--start-day-sat': day === 1
                && startDay === 'sat',
              'calendar__day--start-day-sun': day === 1
                && startDay === 'sun'
            }
          )}
          key={`${day}`}
        >
          <CalendarDay
            currentDay={daysOfWeek[configureDate(day)]}
            dayOfMonth={day}
          />
        </div>
      ))}
    </div>
  );
});
