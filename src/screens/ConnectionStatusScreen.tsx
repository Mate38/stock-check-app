import React, { useEffect, useState } from 'react';
import { Container, StatusIndicator, InfoSection } from '../styles/ConnectionStatusStyles';
import NetInfo from '@react-native-community/netinfo';

const ConnectionStatusScreen = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const subscription = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected && state.isInternetReachable);
    });

    return () => subscription();
  }, []);

  return (
    <Container>
      <InfoSection>
        <StatusIndicator online={isOnline}>
          {isOnline ? 'Conectado' : 'Desconectado'}
        </StatusIndicator>
      </InfoSection>
    </Container>
  );
};

export default ConnectionStatusScreen;
