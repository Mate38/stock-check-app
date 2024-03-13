import apiClient from '../api/apiClient';
import { ICompanyData } from '../types/CompanyDataTypes';
import { DatabaseService } from './DatabaseService';

const ENDPOINT = '/rpc/v1/application.get-client';

const COMPANY_JSON_ID = 'companyData';

const fetchCompanyData = async (): Promise<ICompanyData> => {
    const response = await apiClient.post<ICompanyData>(ENDPOINT);
    await storeCompanyData(response.data);
    return response.data;
};

const storeCompanyData = async (companyData: ICompanyData): Promise<void> => {
    await DatabaseService.storeJson(COMPANY_JSON_ID, companyData);
};

const getCompanyData = async (): Promise<ICompanyData | null> => {
    return DatabaseService.getJson<ICompanyData>(COMPANY_JSON_ID);
};

export const CompanyService = {
    fetchCompanyData,
    getCompanyData,
    storeCompanyData
};
