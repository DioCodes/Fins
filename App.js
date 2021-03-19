import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';

import { bootstrap } from './src/bootstrap'; 
import { MainNavigation } from './src/navigation/MainNavigation';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => {
          setIsLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <MainNavigation />
  );
}

