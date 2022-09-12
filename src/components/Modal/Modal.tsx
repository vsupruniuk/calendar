import React, { useState } from 'react';
import './Modal.scss';
import { Event } from '../../types/Event';
import classNames from 'classnames';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  closeModal: () => void
  eventInfo: Event
  saveEvents: (newEvents: Event[]) => void
}

export const Modal: React.FC<Props> = React.memo(({
  closeModal, eventInfo = {}, saveEvents
}) => {
  const [eventData, setEventData] = useState({
    title: eventInfo.title || '',
    description: eventInfo.description || '',
    date: eventInfo.date || '',
    time: eventInfo.time || '',
    createdAt: eventInfo.createdAt || '',
    updatedAt: eventInfo.updatedAt || ''
  });
  const [eventError, setEventError] = useState({
    title: false,
    date: false
  });
  const [events, setEvents] = useLocalStorage('events', []);

  const handleEventDataChange = (field: string, value: string): void => {
    setEventData({
      ...eventData,
      [field]: value
    });
  };

  const handleEventErrorsChange = (field: string, data: string): void => {
    if (!data.length) {
      setEventError({
        ...eventError,
        [field]: true
      });
    }
  };

  const deleteEvent = (): void => {
    const filteredEvents = [...events].filter(event => {
      return event.id !== eventInfo.id;
    });

    setEvents(filteredEvents);

    saveEvents(filteredEvents);

    closeModal();
  };

  const onFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const createdDate = new Date().toLocaleDateString()
      .split('.')
      .reverse()
      .join('.');
    const createdTime = new Date()
      .toLocaleTimeString()
      .split(':')
      .slice(0, -1)
      .join(':');

    const newEvent = {
      id: eventInfo.id ? eventInfo.id : uuidv4(),
      ...eventData,
      createdAt: eventInfo.createdAt
        ? eventInfo.createdAt : `${createdDate} ${createdTime}`,
      updatedAt: eventInfo.id ? `${createdDate} ${createdTime}` : ''
    };

    if (eventInfo.createdAt) {
      const preparedEvents = [...events].map(event => {
        if (event.id === newEvent.id) {
          return { ...newEvent };
        } else {
          return event;
        }
      });
      setEvents(preparedEvents);

      saveEvents(preparedEvents);
    } else {
      const preparedEvents = [...events, newEvent];
      setEvents(preparedEvents);

      saveEvents(preparedEvents);
    }

    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal__background">
        <div className="modal__content">
          <form className="modal__form" onSubmit={onFormSubmit}>
            <div className="modal__header">
              <div className="modal__title-container">
                <h2 className="modal__title">
                  Add a new event
                </h2>

                {eventInfo.createdAt && (
                  <div className="modal__creation-info">
                    Crated at {eventInfo.createdAt}
                  </div>
                )}

                {eventInfo.updatedAt && (
                  <div className="modal__creation-info">
                    Updated at {eventInfo.updatedAt}
                  </div>
                )}
              </div>

              <button
                className="modal__close-button"
                type="button"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal__title-info">
              <span>Title*</span>

              <input
                name="title"
                type="text"
                value={eventData.title}
                placeholder="Enter title"
                className={classNames('modal__input', {
                  'modal__input--error': eventError.title
                })}
                onChange={(event) => {
                  handleEventDataChange(event.target.name, event.target.value);
                  setEventError({ ...eventError, title: false });
                }}
                onBlur={(event) => {
                  handleEventErrorsChange(
                    event.target.name, event.target.value
                  );
                }}
              />
            </div>

            <div className="modal__description-info">
              <span>Description</span>

              <textarea
                name="description"
                value={eventData.description}
                className="modal__input modal__input--textarea"
                onChange={(event) => {
                  handleEventDataChange(event.target.name, event.target.value);
                }}
              ></textarea>
            </div>

            <div className="modal__time-info">
              <div className="modal__date">
                <span>Date*</span>

                <input
                  name="date"
                  type="date"
                  value={eventData.date}
                  className={classNames('modal__input', 'modal__input--date', {
                    'modal__input--error': eventError.date
                  })}
                  onChange={(event) => {
                    handleEventDataChange(
                      event.target.name, event.target.value
                    );
                    setEventError({ ...eventError, date: false });
                  }}
                  onBlur={(event) => {
                    handleEventErrorsChange(
                      event.target.name, event.target.value
                    );
                  }}
                />
              </div>

              <div className="modal__time">
                <span>Time</span>

                <input
                  name="time"
                  type="time"
                  value={eventData.time}
                  className="modal__input modal__input--time"
                  onChange={(event) => {
                    handleEventDataChange(
                      event.target.name, event.target.value
                    );
                  }}
                />
              </div>
            </div>

            <div className="modal__required">* - required fields</div>

            <div className="modal__control-buttons">
              <button
                className="modal__button-delete"
                type="button"
                disabled={!eventInfo.id}
                onClick={() => deleteEvent()}
              ></button>

              <button
                className="modal__button-save"
                type="submit"
                disabled={!eventData.title || !eventData.date}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
