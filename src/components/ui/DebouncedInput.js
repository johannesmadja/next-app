'use client';
import { useState, useEffect } from 'react';

export function DebouncedInput({ value, onChange, ...props }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(text);
    }, 300); // Délai de 300ms

    return () => clearTimeout(timer);
  }, [text, onChange]);

  return (
    <input 
      {...props} 
      value={text} 
      onChange={(e) => setText(e.target.value)} 
    />
  );
}