import axios from 'axios';

const UrlApi = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export default UrlApi;