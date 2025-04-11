import api from './api';

export const getAllUsers = () => api.get('/user/findall');
export const deleteUser = (id) =>
    api.delete('/user/delete/userId', {
      params: { id },
    });
