import React, { useEffect, useState } from 'react';
import { ProfileService } from '../services/ProfileService';
import { Container, Title, Info, InfoSection } from '../styles/DataShowStyles';
import { IProfileData } from '../types/ProfileTypes'; 

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
        return <Container><Title>Carregando...</Title></Container>;
    }

    if (error) {
        return <Container><Title>{error}</Title></Container>;
    }

    return (
        <Container>
            <InfoSection>
                <Info>Nome: {profile?.name}</Info>
                <Info>Email: {profile?.email}</Info>
            </InfoSection>
        </Container>
    );
};

export default ProfileScreen;
