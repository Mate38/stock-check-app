import axios from 'axios';
import { getToken } from '../utils/storage';

const baseURL = 'https://app.homolog.clippfacil.com.br/rpc/v1/application.get-profile';

const fetchUserProfile = async () => {
  try {
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
          'Content-Type': 'application/json',
          'origin': 'https://homolog.zetaweb.com.br',
          'referer': 'https://homolog.zetaweb.com.br/'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
};

export const ProfileService = {
  fetchUserProfile
};
