import React, { useContext, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { NavigationContext } from '../contexts/NavigationContext';
import { configureApiClient } from '../services/ApiService';
import { logoutUser } from '../services/AuthService';

import { ActivityIndicator, Alert } from 'react-native';
import { LoadingContainer } from '../styles/DataShowStyles';

import CustomDrawerContent from './CustomDrawerContent';

import ProfileScreen from '../screens/ProfileScreen';
import CompanyScreen from '../screens/CompanyScreen';
import ConnectionStatusScreen from '../screens/ConnectionStatusScreen';
import ProductListScreen from '../screens/ProductListScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [loading, setLoading] = useState(true);

  const { navigationReady } = useContext(NavigationContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigationReady) {
      configureApiClient(navigation)
        .then(() => setLoading(false))
        .catch((error) => {
          Alert.alert(
            'Sessão Expirada',
            'Sua sessão expirou. Por favor, faça o login novamente.',
            [{ text: 'OK', onPress: () => logoutUser(navigation) }]
          );
          setLoading(false);
        });
    }
  }, [navigation, navigationReady]);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator testID="loading-indicator" size="large" color="#007bff" />
      </LoadingContainer>
    );
  }

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Lista de Produtos" component={ProductListScreen} />
      <Drawer.Screen name="Perfil do Usuário" component={ProfileScreen} />
      <Drawer.Screen name="Dados da Empresa" component={CompanyScreen} />
      <Drawer.Screen name="Status de Conexão" component={ConnectionStatusScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
