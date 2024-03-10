import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConnectionStatusScreen from '../screens/ConnectionStatusScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Perfil do Usuário" component={ProfileScreen} />
      <Drawer.Screen name="Status de Conexão" component={ConnectionStatusScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
