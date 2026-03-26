import { useState, useEffect } from 'react';

/**
 * useDebounce
 * Delays updating the returned value until `delay` ms have passed
 * since the last change to `value`.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Milliseconds to wait (default 300)
 * @returns {any} The debounced value
 */
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value changes before delay completes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
