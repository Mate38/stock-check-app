import React, { useEffect, useState } from 'react';
import { ProfileService } from '../services/ProfileService';
import { Container, Title, UserInfo, UserInfoSection } from '../styles/ProfileStyles';

const ProfileScreen = () => {
    const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
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
        return <Container><Title>Carregando...</Title></Container>;
    }

    if (error) {
        return <Container><Title>{error}</Title></Container>;
    }

    return (
        <Container>
            <UserInfoSection>
                <UserInfo>Nome: {profile?.name}</UserInfo>
                <UserInfo>Email: {profile?.email}</UserInfo>
            </UserInfoSection>
        </Container>
    );
};

export default ProfileScreen;
