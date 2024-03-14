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

import { ICompany } from '../types/CompanyTypes';

import { useConnection } from '../contexts/ConnectionContext';
import { CompanyService } from '../services/CompanyService';


const CompanyScreen = () => {
  const [company, setCompany] = useState<ICompany | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isConnected } = useConnection();

  useFocusEffect(
    React.useCallback(() => {
      loadCompany();
    }, [])
  );

  const loadCompany = async () => {
    setError(null);
    setLoading(true);
    try {
      let data;
      if (isConnected) {
        data = await CompanyService.fetchCompany();
      } else {
        data = await CompanyService.getLocalCompany();
      }
      setCompany(data);
    } catch (error) {
      setError('Erro ao carregar os dados da empresa');
    } finally {
      setLoading(false);
    }
  };

  const formatCNPJ = (cnpj: string): string => {
    const numericCNPJ = cnpj.replace(/\D/g, '');
    return numericCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const formatPhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

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
        <ContentInfo>{company?.name}</ContentInfo>
        <TitleInfo>CNPJ:</TitleInfo>
        <ContentInfo>{company?.identification ? formatCNPJ(company?.identification) : ''}</ContentInfo>
        <TitleInfo>Endereço:</TitleInfo>
        <ContentInfo>{`${company?.addressCollection[0]?.street}, ${company?.addressCollection[0]?.number}, ${company?.addressCollection[0]?.neighbourhood}, ${company?.addressCollection[0]?.zipCode.city.name} - ${company?.addressCollection[0]?.zipCode.city.state.acronym}`}</ContentInfo>
        <TitleInfo>Telefone:</TitleInfo>
        <ContentInfo>{company?.phoneCollection[0]?.number ? formatPhone(company?.phoneCollection[0]?.areaCode + company?.phoneCollection[0]?.number) : ''}</ContentInfo>
      </InfoSection>
    </Container>
  );
};

export default CompanyScreen;
