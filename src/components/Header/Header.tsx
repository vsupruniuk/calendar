import React from 'react';
import './Header.scss';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

type Props = {
  currentMonth: [number, number]
  changeDate: (action: string) => void
  setUserDate: (date: string) => void
}

export const Header: React.FC<Props> = React.memo(({
  currentMonth, changeDate, setUserDate
}) => {
  const [year, month] = currentMonth;

  const transformDate = (): string => {
    if (month < 10) {
      return `${year}-0${month}`;
    } else {
      return `${year}-${month}`;
    }
  };

  return (
    <div className="header">
      <button className="header__add-todo" type="button"></button>

      <div className="header__date-control">
        <div className="header__buttons">
          <button
            className="header__today"
            type="button"
            onClick={() => changeDate('today')}
          >
            Today
          </button>

          <button
            className="header__prev-month"
            type="button"
            onClick={() => changeDate('decrease')}
          ></button>

          <span className="header__month">
            {`${monthNames[month - 1]}, ${year}`}
          </span>

          <button
            className="header__next-month"
            type="button"
            onClick={() => changeDate('increase')}
          ></button>
        </div>

        <input
          className="header__date-picker"
          type="month"
          onChange={(event) => setUserDate(event.target.value) }
          value={transformDate()}
          />
      </div>
    </div>
  );
});
