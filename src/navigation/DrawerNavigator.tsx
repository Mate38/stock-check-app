import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { NavigationContext } from '../contexts/NavigationContext';
import { configureApiClient } from '../services/ApiService';

import CustomDrawerContent from './CustomDrawerContent';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CompanyScreen from '../screens/CompanyScreen';
import ConnectionStatusScreen from '../screens/ConnectionStatusScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  const { navigationReady } = useContext(NavigationContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigationReady) {
      configureApiClient(navigation);
    }
  }, [navigation, navigationReady]);

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Lista de Produtos" component={ProductListScreen} />
      <Drawer.Screen name="Perfil do Usuário" component={ProfileScreen} />
      <Drawer.Screen name="Dados da Empresa" component={CompanyScreen} />
      <Drawer.Screen name="Status de Conexão" component={ConnectionStatusScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
