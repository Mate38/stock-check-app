import axios from 'axios';
import { getToken } from '../utils/storage';
import { API_URL, API_HEADERS } from '../config/constants';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: API_HEADERS
});

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

export default apiClient;
