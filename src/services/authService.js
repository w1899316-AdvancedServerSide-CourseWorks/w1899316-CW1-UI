import api from './api';

export const registerUser = async (userData) => {
    const response = await api.post('/user/create', userData);
    return response.data;
};
export const loginUser = async (userData) => {
    const response = await api.post('/user/login', userData);
    return response.data;
};
export const getSessionUser = async () => {
  const res = await api.get('/user/verify/user'); // uses the token from cookie
  return res.data;
};
export const logoutUser = () => api.post('/user/logout');