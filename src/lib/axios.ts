import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8081';

const backendApi = axios.create({
  baseURL: `${backendUrl}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('token-appcenter')}`,
  },
});

backendApi.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token-appcenter');
  if (token) {
    config.headers.Authorization = `Bearer  ${token}`;
  }
  return config;
});

export default backendApi;
