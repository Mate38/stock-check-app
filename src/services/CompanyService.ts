import axios from 'axios';
import { getToken } from '../utils/storage';
import { ICompanyData } from '../types/CompanyDataTypes';

const API_URL = 'https://app.homolog.clippfacil.com.br/rpc/v1/application.get-client';

export const fetchCompanyData = async (): Promise<ICompanyData> => {
  const accessToken = await getToken();
  if (!accessToken) {
    throw new Error('Token de acesso não disponível');
  }

  const response = await axios.post(API_URL, {}, {
    headers: {
      'Authorization-Compufacil': accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};
