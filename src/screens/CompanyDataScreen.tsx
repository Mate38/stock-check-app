import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { CompanyService } from '../services/CompanyService';
import { ICompanyData } from '../types/CompanyDataTypes';
import { Container, InfoSection, TitleInfo, ContentInfo, LoadingContainer, ErrorContainer, ErrorText } from '../styles/DataShowStyles';
import { checkConnection } from '../services/ConnectionService';
import { useFocusEffect } from '@react-navigation/native';

const CompanyDataScreen = () => {
  const [companyData, setCompanyData] = useState<ICompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCompanyData = async () => {
    setLoading(true);
    try {
      const isOnline = await checkConnection();
      let data;
      if (isOnline) {
        data = await CompanyService.fetchCompanyData();
      } else {
        data = await CompanyService.getCompanyData();
      }
      setCompanyData(data);
    } catch (error) {
      setError('Erro ao carregar os dados da empresa');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCompanyData();
    }, [])
  );

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
        <ContentInfo>{companyData?.name}</ContentInfo>
        <TitleInfo>CNPJ:</TitleInfo>
        <ContentInfo>{companyData?.identification ? formatCNPJ(companyData?.identification) : ''}</ContentInfo>
        <TitleInfo>Endereço:</TitleInfo>
        <ContentInfo>{`${companyData?.addressCollection[0]?.street}, ${companyData?.addressCollection[0]?.number}, ${companyData?.addressCollection[0]?.neighbourhood}, ${companyData?.addressCollection[0]?.zipCode.city.name} - ${companyData?.addressCollection[0]?.zipCode.city.state.acronym}`}</ContentInfo>
        <TitleInfo>Telefone:</TitleInfo>
        <ContentInfo>{companyData?.phoneCollection[0]?.number ? formatPhone(companyData?.phoneCollection[0]?.areaCode + companyData?.phoneCollection[0]?.number) : ''}</ContentInfo>
      </InfoSection>
    </Container>
  );
};

export default CompanyDataScreen;
