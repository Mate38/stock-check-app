import React, { useEffect, useState } from 'react';
import { fetchCompanyData } from '../services/CompanyService';
import { ICompanyData } from '../types/CompanyDataTypes';
import { Container, Title, Info, InfoSection } from '../styles/DataShowStyles';

const CompanyDataScreen = () => {
    const [companyData, setCompanyData] = useState<ICompanyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCompanyData().then(data => {
            setCompanyData(data);
            setLoading(false);
        }).catch(error => {
            console.error(error);
            setError(error.message);
            setLoading(false);
        });
    }, []);

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
        return <Container><Title>Carregando...</Title></Container>;
    }

    if (error) {
        return <Container><Title>{error}</Title></Container>;
    }

    return (
        <Container>
            <InfoSection>
                <Info>Nome: {companyData?.name}</Info>
                <Info>CNPJ: {companyData?.identification ? formatCNPJ(companyData?.identification) : ''}</Info>
                <Info>Endereço: {companyData?.addressCollection[0]?.street}, {companyData?.addressCollection[0]?.number}, {companyData?.addressCollection[0]?.neighbourhood}, {companyData?.addressCollection[0]?.zipCode.city.name} - {companyData?.addressCollection[0]?.zipCode.city.state.acronym}</Info>
                <Info>Telefone: {companyData?.phoneCollection[0]?.number ? formatPhone(companyData?.phoneCollection[0]?.areaCode + companyData?.phoneCollection[0]?.number) : ''}</Info>
            </InfoSection>
        </Container>
    );
};

export default CompanyDataScreen;
