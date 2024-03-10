import React, { useEffect, useState } from 'react';
import { Container, Title, StatusIndicator } from '../styles/ConnectionStatusStyles';
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
      <StatusIndicator online={isOnline}>
        {isOnline ? 'Conectado' : 'Desconectado'}
      </StatusIndicator>
    </Container>
  );
};

export default ConnectionStatusScreen;
