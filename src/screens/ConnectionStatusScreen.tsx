import React from 'react';

import { 
  Container, 
  StatusIndicator, 
  InfoSection 
} from '../styles/ConnectionStatusStyles';

import { useConnection } from '../contexts/ConnectionContext';


const ConnectionStatusScreen = () => {
  const { isConnected } = useConnection();

  return (
    <Container>
      <InfoSection>
        <StatusIndicator online={isConnected} testID={isConnected ? 'status-connected' : 'status-disconnected'}>
          {isConnected ? 'Conectado' : 'Desconectado'}
        </StatusIndicator>
      </InfoSection>
    </Container>
  );
};

export default ConnectionStatusScreen;
