import { useState } from 'react';
import { Event } from '../types/Event';

type ReturnType = [Event[] | [], (newValue: Event[]) => void]

export const useLocalStorage = (
  key: string, initialValue: Event[] | []
): ReturnType => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(`${localStorage.getItem(key)}`) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Event[]): void => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
