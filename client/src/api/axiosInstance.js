import axios from 'axios';

let api;

if (process.env.NODE_ENV === 'production') {
  api = axios.create({
    baseURL: 'https://course-gpt.herokuapp.com/api',
  });
} else {
  api = axios.create({
    baseURL: 'http://localhost:3001/api',
  });
}

export default api;
