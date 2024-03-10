import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authenticate } from '../services/AuthService';
import { Container, Input, ButtonContainer, ButtonText, Title } from '../styles/LoginStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('testeapp@compufour.com.br');
  const [password, setPassword] = useState<string>('testeApp@123');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'E-mail e senha são obrigatórios.');
      return;
    }

    try {
      const isAuthenticated = await authenticate(email, password);
      if (!isAuthenticated) {
        throw new Error('Falha na autenticação, verifique suas credenciais');
      }
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Erro de login:', error.message);
      Alert.alert('Erro de login', error.message);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <ButtonContainer onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default LoginScreen;

