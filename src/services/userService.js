import api from './api';

export const getAllUsers = () => api.get('/user/findall');
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
