import React, { useEffect, useState, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DatabaseService } from '../services/DatabaseService';
import { storeToken } from '../utils/storage';
import { ActivityIndicator } from 'react-native';
import { LoadingContainer } from '../styles/DataShowStyles';
import { NavigationContext } from '../contexts/NavigationContext';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  const [initialRouteName, setInitialRouteName] = useState<string | undefined>(undefined);
  const { setNavigationReady } = useContext(NavigationContext);

  const checkUserToken = async () => {
    const json: any = await DatabaseService.getJson('userAuth');
    if (json && json.access_token) {
      await storeToken(json.access_token);
      setInitialRouteName('HomeDrawer');
    } else {
      setInitialRouteName('Login');
    }
  };

  useEffect(() => {
    checkUserToken();
  }, []);

  if (initialRouteName === undefined) {
    return (
      <LoadingContainer>
        <ActivityIndicator testID="loading-indicator" size="large" color="#007bff" />
      </LoadingContainer>
    );
  }

  return (
    <NavigationContainer onReady={() => setNavigationReady(true)}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeDrawer" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
