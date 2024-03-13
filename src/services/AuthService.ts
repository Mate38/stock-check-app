import apiClient from '../api/apiClient';
import { storeToken } from '../utils/storage';
import { IAuthResponse, IAuthError } from '../types/AuthTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseService } from './DatabaseService';

const ENDPOINT = '/rpc/v2/application.authenticate';

export const authenticate = async (login: string, password: string): Promise<boolean> => {
  try {
    const response = await apiClient.post<IAuthResponse>(ENDPOINT, {
      login,
      password,
      isModulizedAccess: true
    });

    const { access_token: accessToken, auth_status: authStatus } = response.data;

    DatabaseService.storeJson('userAuth', response.data);

    if (authStatus === 200 && accessToken) {
      await storeToken(accessToken);
      return true;
    }

    return false;
  } catch (error: any) {
    const authError = error.response?.data as IAuthError;
    const errorMessage = authError?.error_message || 'Falha na autenticação, verifique suas credenciais';
    throw new Error(errorMessage);
  }
};

export const logoutUser = async (navigation: any) => {
  await AsyncStorage.clear();
  await DatabaseService.removeJson('userAuth');
  navigation.navigate('Login');
};
