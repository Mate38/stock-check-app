import React from 'react';
import { View, Text } from 'react-native';
import { Container, Title, ButtonContainer, ButtonText } from '../styles/CommonStyles';

const HomeScreen = () => {
  return (
    <Container>
      <Title>Home Screen</Title>
      <ButtonContainer onPress={() => console.log('Ação')}>
        <ButtonText>Click Me</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default HomeScreen;
