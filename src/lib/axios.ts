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

backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem('token-appcenter');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default backendApi;
