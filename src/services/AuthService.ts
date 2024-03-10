import axios from 'axios';

const API_URL = 'https://your-api-url.com/login';

export const authenticate = async (username: string, password: string) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    if (response.data.accessToken) {
      console.log('Login bem-sucedido:', response.data);
    }
  } catch (error) {
    console.error('Erro de login:', error);
    throw error;
  }
};
