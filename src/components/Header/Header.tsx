import React from 'react';

type Props = {
  currentMonth: [number, number]
  changeDate: (action: string) => void
}

export const Header: React.FC<Props> = React.memo(({
  currentMonth, changeDate
}) => {
  const [year, month] = currentMonth;

  return (
    <div className="header"></div>
  );
});
