import apiClient from '../api/apiClient';
import { ICompanyData } from '../types/CompanyDataTypes';

const ENDPOINT = '/rpc/v1/application.get-client';

export const fetchCompanyData = async (): Promise<ICompanyData> => {
    const response = await apiClient.post<ICompanyData>(ENDPOINT);
    return response.data;
};

export const CompanyService = {
    fetchCompanyData
};
