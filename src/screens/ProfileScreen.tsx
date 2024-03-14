import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { 
  ActivityIndicator 
} from 'react-native';

import { 
  Container, 
  InfoSection, 
  TitleInfo, 
  ContentInfo, 
  LoadingContainer, 
  ErrorContainer, 
  ErrorText 
} from '../styles/DataShowStyles';

import { IProfileData } from '../types/ProfileTypes';

import { useConnection } from '../contexts/ConnectionContext';
import { ProfileService } from '../services/ProfileService';


const ProfileScreen = () => {
  const [profile, setProfile] = useState<IProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isConnected } = useConnection();

  const loadProfileData = async () => {
    setError(null);
    setLoading(true);
    try {
      let profileData;
      if (isConnected) {
        profileData = await ProfileService.fetchUserProfile();
      } else {
        profileData = await ProfileService.getLocalProfile();
      }
      setProfile(profileData);
    } catch (error) {
      setError('Erro ao carregar os dados do perfil');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadProfileData();
    }, [])
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator testID="loading-indicator" size="large" color="#007bff" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText testID="error-text">{error}</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <InfoSection>
        <TitleInfo>Nome:</TitleInfo>
        <ContentInfo>{profile?.name}</ContentInfo>
        <TitleInfo>Email:</TitleInfo>
        <ContentInfo>{profile?.email}</ContentInfo>
      </InfoSection>
    </Container>
  );
};

export default ProfileScreen;
