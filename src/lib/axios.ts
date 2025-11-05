import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const backendApi = axios.create({
  baseURL: `${backendUrl}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('token-appcenter')}`,
  },
});

export default backendApi;
