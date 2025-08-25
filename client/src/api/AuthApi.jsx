import axios from 'axios';

const AuthApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default AuthApi;