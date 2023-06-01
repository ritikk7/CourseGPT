import axios from 'axios';
import {testing} from "../index";

const api = axios.create({
  //baseURL: testing ? 'http://localhost:3001/api' : 'https://course-gpt.herokuapp.com/api',
  baseURL:'http://localhost:3001/api',
  withCredentials: true,
});

export default api;
