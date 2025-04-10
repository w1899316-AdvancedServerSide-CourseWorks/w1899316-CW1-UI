import api from './api';

export const getApiKeys = (userId) => {
    return api.get(`/apiKey/findall/userId`, {
      params: {
        userId: userId
      }
    });
  };
export const generateApiKey = (userId, expiresAt) => {
  return api.post('/apiKey/create', {
    userId,
    expiresAt
  });
};
export const deleteApiKey = (apiKeyId) =>
  api.delete(`/apiKey/delete/apiKeyId`, {
    params: { id: apiKeyId },
  });

export const revokeApiKey = () => api.delete('/key/revoke');
