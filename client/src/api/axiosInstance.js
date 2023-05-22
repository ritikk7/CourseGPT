import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || 'https://course-gpt.herokuapp.com/api',
});

export default api;
