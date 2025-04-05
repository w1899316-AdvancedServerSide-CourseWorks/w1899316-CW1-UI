import api from './api';

export const getApiKey = (userId) => {
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


export const revokeApiKey = () => api.delete('/key/revoke');
