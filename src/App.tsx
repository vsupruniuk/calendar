import React from 'react';
import { Calendar } from './components/Сalendar';
import { Header } from './components/Header';
import { Route, Routes, useSearchParams } from 'react-router-dom';

export const App: React.FC = () => {
  const getActualDate = (): [number, number] => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return [year, month];
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date')
    || `${getActualDate()[0]}-${getActualDate()[1]}`;
  const year = Number(date.split('-')[0]);
  const month = Number(date.split('-')[1]);

  const changeDate = (action: string): void => {
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
  };

  const setUserDate = (date: string): void => {
    setSearchParams({ date });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header
              currentMonth={[year, month]}
              changeDate={changeDate}
              setUserDate={setUserDate}
            />
            <Calendar currentMonth={[year, month]} />
          </>
        } />
      </Routes>


    </div>
  );
};
