import { Alert } from 'react-native';
import apiClient from '../api/apiClient';
import { getToken } from '../utils/storage';
import { logoutUser } from './AuthService';

export const configureApiClient = (navigation: any) => {
  apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers['Authorization-Compufacil'] = token;
      if (config.data && typeof config.data === 'object') {
        config.data.access_token = token;
      } else {
        config.data = { access_token: token };
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  apiClient.interceptors.response.use(response => response, error => {
    if (error.response && error.response.data.error_name === 'InvalidToken') {
      Alert.alert(
        'Sessão Expirada',
        'Sua sessão expirou. Por favor, faça o login novamente.',
        [
          {
            text: 'OK',
            onPress: () => logoutUser(navigation)
          }
        ]
      );
    }
    return Promise.reject(error);
  });
};