import React, { useEffect, useState } from 'react';
import { Container, StatusIndicator, InfoSection } from '../styles/ConnectionStatusStyles';
import { checkConnection } from '../services/ConnectionService';

const ConnectionStatusScreen = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyConnection = async () => {
      const onlineStatus = await checkConnection();
      setIsOnline(onlineStatus);
    };

    verifyConnection();
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
