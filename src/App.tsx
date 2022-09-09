import React from 'react';
import { Calendar } from './components/Сalendar';
import { Header } from './components/Header';
import { useDate } from './hooks/useDate';

export const App: React.FC = () => {
  const [
    year, month, setDate
  ] = useDate(new Date().getFullYear(), new Date().getMonth() + 1);

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
    <div className="App">
      <Header
        currentMonth={[year, month]}
        changeDate={changeDate}
      />
      <Calendar currentMonth={[year, month]} />
    </div>
  );
};
