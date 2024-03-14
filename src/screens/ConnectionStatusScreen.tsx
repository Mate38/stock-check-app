import React, { useState } from 'react';
import { Container, StatusIndicator, InfoSection } from '../styles/ConnectionStatusStyles';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';

const ConnectionStatusScreen = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe : any = NetInfo.addEventListener(state => {
        setIsOnline(state.isConnected && state.isInternetReachable);
      });

      return () => unsubscribe();
    }, [])
  );

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
