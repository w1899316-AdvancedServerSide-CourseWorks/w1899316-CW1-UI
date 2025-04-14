import api from './api';
import { UserDTO } from '../dto/userDto';

export const registerUser = async (userData) => {
  const response = await api.post('/user/create', userData);
  return new UserDTO(response.data);
};

export const loginUser = async (userData) => {
  const response = await api.post('/user/login', userData);
  return new UserDTO(response.data);
};

export const getSessionUser = async () => {
  const response = await api.get('/user/verify/user');
  return new UserDTO(response.data);
};

export const logoutUser = () => api.post('/user/logout');
