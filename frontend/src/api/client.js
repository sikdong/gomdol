import axios from 'axios';
import { getCookie } from '../utils/cookies';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie('gomdol_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
