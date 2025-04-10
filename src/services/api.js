import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cw1-be.autodock.me/rest-countries/api',
  withCredentials: true,
});

export default api;
