import React from 'react';
import './CalendarDay.scss';
import { Event } from '../../types/Event';

type Props = {
  dayNumber: string,
  dayOfMonth: number,
  events: Event[]
  openModal: (value: boolean) => void
  prepareData: (event: Event) => void
}

export const CalendarDay: React.FC<Props> = React.memo(({
  dayNumber, dayOfMonth, events, openModal, prepareData
}) => {
  const onEventClick = (
    even: React.MouseEvent<HTMLDivElement>, calendarEvent: Event
  ): void => {
    even.stopPropagation();
    prepareData(calendarEvent);
    openModal(true);
  };

  return (
    <div className="calendar-day">
      <div className="calendar-day__day-info">
        {`${dayOfMonth} ${dayNumber}`}
      </div>

      {events.map(calendarEvent => (
        <div
          key={calendarEvent.id}
          className="calendar-day__event"
          onClick={(event) => {
            onEventClick(event, calendarEvent);
          }}
        >
          {calendarEvent.title}
        </div>
      ))}
    </div>
  );
});
