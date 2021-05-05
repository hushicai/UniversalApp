import {useState} from 'react';

// pc端无键盘
export default function useKeyboard() {
  const [shown] = useState(false);

  return {
    keyboardShown: shown,
    coordinates: {start: {}, end: {height: 0}},
  };
}
