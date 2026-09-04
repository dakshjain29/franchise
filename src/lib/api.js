import axios from 'axios';
import { clearAuth, getAuth } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:2008',
});

api.interceptors.request.use((config) => {
  const auth = getAuth();
  if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isLoginRequest = requestUrl.includes('/admin/login') || requestUrl.includes('/franchise/loginFranchise');
    if ([401, 403].includes(error.response?.status) && !isLoginRequest) {
      clearAuth();
      if (window.location.pathname !== '/login') window.location.assign('/login?expired=1');
    }
    return Promise.reject(error);
  },
);

export default api;