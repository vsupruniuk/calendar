import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDay } from '../CalendarDay';
import { Event } from '../../types/Event';
import  './Calendar.scss';
import classNames from 'classnames';

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

type Props = {
  currentMonth: [number, number]
  openModal: (value: boolean) => void
  prepareData: (event: Event) => void
  defaultEvent: Event
  events: Event[]
}

export const Calendar:React.FC<Props> = React.memo(({
  currentMonth, openModal, prepareData, defaultEvent, events
}) => {
  const [year, month] = currentMonth;
  const [days, setDays] = useState(new Date(year, month, 0).getDate());
  const [startDay, setStartDay] = useState('');
  const currentDay = useMemo(() => {
    return new Date().toLocaleDateString().split('.');
  }, []);

  const configureDay = useCallback((day: number): number => {
    const configuratedDay = new Date(year, month - 1, day);

    return configuratedDay.getDay();
  }, [year, month]);

  useEffect(() => {
    setDays(new Date(year, month, 0).getDate());

    const firstDay = configureDay(1);

    setStartDay(daysOfWeek[firstDay].toLowerCase());
  }, [year, month]);

  const transformDate = useCallback((day: number): string => {
    const stringYear = `${year}`;
    const stringMonth = month >= 10 ? `${month}` : `0${month}`;
    const stringDay = day >= 10 ? `${day}` : `0${day}`;

    return `${stringYear}-${stringMonth}-${stringDay}`;
  }, [year, month]);

  const filteredEvents = useCallback((day: number): Event[] => {
    return events.filter(event => event.date === transformDate(day));
  }, [events]);

  return (
    <div className={`calendar calendar__start-day--${startDay}`}>
      {Array.from(Array(days + 1).keys()).slice(1).map(day => (
        <div
          key={`${day}`}
          onClick={() => {
            prepareData({ ...defaultEvent, date: transformDate(day) });
            openModal(true);
          }}
          className={classNames(
            'calendar__day',
            {
              'calendar__day--current': Number(currentDay[0]) === day
                && Number(currentDay[1]) === month
                && Number(currentDay[2]) === year
            }
          )}
        >
          <CalendarDay
            dayNumber={daysOfWeek[configureDay(day)]}
            dayOfMonth={day}
            events={filteredEvents(day)}
            openModal={openModal}
            prepareData={prepareData}
          />
        </div>
      ))}
    </div>
  );
});
