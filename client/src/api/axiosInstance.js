import axios from 'axios';

export const baseUrl = process.env.NODE_ENV === "development" || process.env.REACT_APP_ENV === "staging" ? 'http://localhost:3001/api' : 'https://course-gpt.herokuapp.com/api';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export default api;
