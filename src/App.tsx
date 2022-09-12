import React, { useCallback, useEffect, useState } from 'react';
import { Calendar } from './components/Сalendar';
import { Header } from './components/Header';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { Modal } from './components/Modal';
import { Event } from './types/Event';

const defaultEvent = { id: '', title: '', description: '', date: '', time: '' };

export const App: React.FC = () => {
  const getActualDate = (): [number, number] => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return [year, month];
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataForModal, setDataForModal] = useState<Event>(defaultEvent);
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date')
    || `${getActualDate()[0]}-${getActualDate()[1]}`;
  const year = Number(date.split('-')[0]);
  const month = Number(date.split('-')[1]);
  const [events, setEvents] = useState<Event[] | []>(
    JSON.parse(`${localStorage.getItem('events')}`) || []
  );

  useEffect(() => {
    setEvents(JSON.parse(`${localStorage.getItem('events')}`) || []);
  }, [year, month]);

  const saveEvents = (newEvents: Event[]): void => {
    setEvents(newEvents);
  };

  const changeDate = useCallback((action: string): void => {
    switch (action) {
      case 'increase':
        if (month === 12) {
          setSearchParams({ date: `${year + 1}-${1}` });
        } else {
          setSearchParams({ date: `${year}-${month + 1}` });
        }

        break;

      case 'decrease':
        if (month === 1) {
          setSearchParams({ date: `${year - 1}-${12}` });
        } else {
          setSearchParams({ date: `${year}-${month - 1}` });
        }

        break;

      case 'today':
        setSearchParams({});

        break;

      default:
        break;
    }
  }, [year, month]);

  const setUserDate = useCallback((newDate: string): void => {
    setSearchParams({ date: newDate });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            {isModalOpen && (
              <Modal
                closeModal={() => setIsModalOpen(false)}
                eventInfo={dataForModal}
                saveEvents={saveEvents}
              />
            )}
            <Header
              currentMonth={[year, month]}
              changeDate={changeDate}
              setUserDate={setUserDate}
              openModal={setIsModalOpen}
              prepareData={setDataForModal}
              defaultEvent={defaultEvent}

            />
            <Calendar
              currentMonth={[year, month]}
              openModal={setIsModalOpen}
              prepareData={setDataForModal}
              defaultEvent={defaultEvent}
              events={events}
            />
          </>
        } />
      </Routes>
    </div>
  );
};
