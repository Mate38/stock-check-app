import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ProfileService } from '../services/ProfileService';
import { IProfileData } from '../types/ProfileTypes';
import { Container, InfoSection, TitleInfo, ContentInfo, LoadingContainer, ErrorContainer, ErrorText } from '../styles/DataShowStyles';
import { checkConnection } from '../services/ConnectionService';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const [profile, setProfile] = useState<IProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const isOnline = await checkConnection();
      let profileData;
      if (isOnline) {
        profileData = await ProfileService.fetchUserProfile();
      } else {
        profileData = await ProfileService.getProfile();
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
