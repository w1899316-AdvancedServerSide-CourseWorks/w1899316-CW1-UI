import api from './api';
import { ApiKeyDTO } from '../dto/apiKeyDto';

export const getApiKeys = async (userId) => {
  const res = await api.get('/apiKey/findall/userId', {
    params: { userId }
  });
  console.log(res.data);
  return res.data.map(apiKey => new ApiKeyDTO(apiKey))
};

export const generateApiKey = async (userId, expiresAt) => {
  const res = await api.post('/apiKey/create', {
    userId,
    expiresAt
  });
  return new ApiKeyDTO(res.data);
};

export const deleteApiKey = (apiKeyId) =>
  api.delete('/apiKey/delete/apiKeyId', {
    params: { id: apiKeyId }
  });

export const revokeApiKey = () =>
  api.delete('/key/revoke');
