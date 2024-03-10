// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  Input,
  ButtonContainer,
  ButtonText
} from '../styles/LoginStyles'; // Ajuste o caminho conforme necessário

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Implemente a lógica de login
    Alert.alert('Login', 'Login efetuado com sucesso!');
    navigation.navigate('Home');
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <ButtonContainer onPress={handleLogin}>
        <ButtonText>Login</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default LoginScreen;
