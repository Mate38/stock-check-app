import axios from 'axios';

import { API_URL, API_HEADERS } from '../config/constants';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: API_HEADERS
});

export default apiClient;
