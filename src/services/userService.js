import api from './api';
import { UserDTO } from '../dto/userDto';

export const getAllUsers = async () => {
  const response = await api.get('/user/findall');
  return response.data.map(user => new UserDTO(user));
};

export const deleteUser = (id) =>
  api.delete('/user/delete/userId', {
    params: { id },
  });
