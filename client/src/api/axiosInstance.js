import axios from 'axios';

const url = process.env.NODE_ENV === "development" || process.env.REACT_APP_ENV === "staging" ? 'http://localhost:3001/api' : 'https://course-gpt.herokuapp.com/api';

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default api;
