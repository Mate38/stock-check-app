import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ProfileService } from '../services/ProfileService';
import { IProfileData } from '../types/ProfileTypes';
import { Container, InfoSection, TitleInfo, ContentInfo, LoadingContainer, ErrorContainer, ErrorText } from '../styles/DataShowStyles';

const ProfileScreen = () => {
  const [profile, setProfile] = useState<IProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await ProfileService.fetchUserProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error(error);
        setError('Erro ao carregar o perfil');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#007bff" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
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
