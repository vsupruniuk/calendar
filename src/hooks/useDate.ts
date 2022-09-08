import { useState } from 'react';

type ReturnType = [number, number, (newYear: number, newMonth: number) => void];

export const useDate = (
  initialYear: number, initialMonth: number
): ReturnType => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const saveValues = (newYear: number, newMonth: number): void => {
    setYear(newYear);
    setMonth(newMonth);
  };

  return [year, month, saveValues];
};
