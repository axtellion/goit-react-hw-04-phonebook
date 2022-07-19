import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const parsedContacts =
      JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
    return [...parsedContacts];
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
