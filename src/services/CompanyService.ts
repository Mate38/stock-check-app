import apiClient from '../api/apiClient';

import { ICompany } from '../types/CompanyTypes';
import { DatabaseService } from './DatabaseService';


const ENDPOINT = '/rpc/v1/application.get-client';

const COMPANY_JSON_ID = 'company';

const fetchCompany = async (): Promise<ICompany> => {
    const response = await apiClient.post<ICompany>(ENDPOINT);
    await storeLocalCompany(response.data);
    return response.data;
};

const storeLocalCompany = async (company: ICompany): Promise<void> => {
    await DatabaseService.storeJson(COMPANY_JSON_ID, company);
};

const getLocalCompany = async (): Promise<ICompany | null> => {
    return DatabaseService.getJson<ICompany>(COMPANY_JSON_ID);
};

export const CompanyService = {
    fetchCompany,
    getLocalCompany,
    storeLocalCompany
};
