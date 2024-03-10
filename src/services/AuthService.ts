import axios from 'axios';
import { storeToken } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://app.homolog.clippfacil.com.br/rpc/v2/application.authenticate';

export const authenticate = async (login: string, password: string) => {
  try {
    const response = await axios.post(API_URL, {
      login,
      password,
      isModulizedAccess: true
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'origin': 'https://homolog.zetaweb.com.br',
        'referer': 'https://homolog.zetaweb.com.br/'
      }
    });

    const { access_token: accessToken, auth_status: authStatus } = response.data;

    if (authStatus === 200 && accessToken) {
      console.log('Login bem-sucedido:', accessToken);
      await storeToken(accessToken);
      return true;
    }

    return false;

  } catch (error) {
    console.error('Erro de login:', error);
    // throw error;
    throw new Error('Falha na autenticação, verifique suas credenciais');
  }
};

export const logoutUser = async (navigation: any) => {
  await AsyncStorage.clear();
  navigation.navigate('Login');
};
