import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authenticate } from '../services/AuthService';
import { Container, Input, ButtonContainer, ButtonText, Title } from '../styles/LoginStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'E-mail e senha são obrigatórios.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Insira um e-mail válido.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    try {
      const isAuthenticated = await authenticate(email, password);
      if (!isAuthenticated) {
        throw new Error('Falha na autenticação, verifique suas credenciais');
      }
      navigation.navigate('HomeDrawer');
    } catch (error: any) {
      Alert.alert('Erro de login', error.message);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        testID="email-input"
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        testID="password-input"
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <ButtonContainer onPress={handleLogin}>
        <ButtonText testID="login-button">Entrar</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default LoginScreen;
