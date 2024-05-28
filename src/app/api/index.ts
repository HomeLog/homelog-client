import axios from 'axios';
import authAPI from './auth/auth.api';
import userAPI from './user/user.api';

export const client = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

const api = {
  auth: authAPI,
  user: userAPI,
};

export default api;
