import axios from 'axios';

const AnalysisUrlApi = axios.create({
  baseURL: 'http://localhost:3002/api',
});

export default AnalysisUrlApi;