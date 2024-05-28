import axios from 'axios';
import * as auth from './auth/auth.api';
import * as user from './user/user.api';

export const client = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

const api = {
  auth,
  user,
};

export default api;
