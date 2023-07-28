/* Taken from https://github.com/ipenywis/react-candy-searchbar/tree/master */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export function useDebounce(value, timeout, callback) {
  const [timer, setTimer] = useState(null);

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    clearTimer();

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]);
}
