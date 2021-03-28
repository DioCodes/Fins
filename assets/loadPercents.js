import React from 'react';
import { Picker } from '@react-native-picker/picker';

export const loadPercents = () => {
  let n = [];
  const minNum = 0;
  const maxNum = 100;

  for (let i = minNum; i <= maxNum; i++) {
    n.push(
      <Picker.Item key={i} label={`${i}%`} value={i} />
    )
  }

  return n;
};
