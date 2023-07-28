import axios from 'axios';

export const apiDefaults = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/',
};

const api = axios.create(apiDefaults);

export default api;
