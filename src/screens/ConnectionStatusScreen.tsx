import React, { useEffect, useState } from 'react';
import { Container, StatusIndicator, InfoSection } from '../styles/ConnectionStatusStyles';
import NetInfo from '@react-native-community/netinfo';

const ConnectionStatusScreen = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const subscription: any = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected && state.isInternetReachable);
    });

    return () => subscription.remove();
  }, []);

  return (
    <Container>
      <InfoSection>
        <StatusIndicator online={isOnline} testID={isOnline ? 'status-connected' : 'status-disconnected'}>
          {isOnline ? 'Conectado' : 'Desconectado'}
        </StatusIndicator>
      </InfoSection>
    </Container>
  );
};

export default ConnectionStatusScreen;
