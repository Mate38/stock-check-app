import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator'; 

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeDrawer" component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
