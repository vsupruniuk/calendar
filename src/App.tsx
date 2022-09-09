import React from 'react';
import { Calendar } from './components/Сalendar';
import { Header } from './components/Header';
import { useDate } from './hooks/useDate';

export const App: React.FC = () => {
  const getActualDate = (): [number, number] => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return [year, month];
  };

  const [
    year, month, setDate
  ] = useDate(getActualDate()[0], getActualDate()[1]);

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

      case 'today':
        setDate(getActualDate()[0], getActualDate()[1]);

        break;

      default:
        break;
    }
  };

  const setUserDate = (date: string): void => {
    const splitedDate = date.split('-');
    setDate(Number(splitedDate[0]), Number(splitedDate[1]));
  };

  return (
    <div className="App">
      <Header
        currentMonth={[year, month]}
        changeDate={changeDate}
        setUserDate={setUserDate}
      />
      <Calendar currentMonth={[year, month]} />
    </div>
  );
};
