import React from 'react';
import { Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { logoutUser } from '../services/AuthService';

const CustomDrawerContent = (props: any) => {
  const logout = async () => {
    Alert.alert(
      "Logout",
      "Deseja sair do aplicativo?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: async () => {
            await logoutUser(props.navigation);
        }}
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={logout} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
