import axios from 'axios';
import { getToken } from '../utils/storage';
import { IProfileData } from '../types/ProfileTypes';

const baseURL = 'https://app.homolog.clippfacil.com.br/rpc/v1/application.get-profile';

export const fetchUserProfile = async (): Promise<IProfileData> => {
  const accessToken = await getToken();
  if (!accessToken) {
    throw new Error('Token de acesso não disponível');
  }

  const response = await axios.post(
    baseURL,
    { access_token: accessToken },
    {
      headers: {
        'Authorization-Compufacil': accessToken,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

export const ProfileService = {
  fetchUserProfile
};