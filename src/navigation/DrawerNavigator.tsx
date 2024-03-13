import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { configureApiClient } from '../services/ApiService';
import { useNavigation } from '@react-navigation/native';
import { NavigationContext } from '../contexts/NavigationContext';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CompanyDataScreen from '../screens/CompanyDataScreen';
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
      <Drawer.Screen name="Dados da Empresa" component={CompanyDataScreen} />
      <Drawer.Screen name="Status de Conexão" component={ConnectionStatusScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
