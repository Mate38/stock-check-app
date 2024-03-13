import 'react-native-gesture-handler';
import React from 'react';
import MainStackNavigator from './src/navigation/MainStackNavigation';
import { DatabaseService } from './src/services/DatabaseService';
import ContextProvider from './src/contexts/ContextProvider';

DatabaseService.initDatabase();

const App = () => {
  return (
    <ContextProvider>
        <MainStackNavigator />
    </ContextProvider>
  );
};

export default App;
