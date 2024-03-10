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
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/json',
        'origin': 'https://homolog.zetaweb.com.br',
        'referer': 'https://homolog.zetaweb.com.br/',
        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36'
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
