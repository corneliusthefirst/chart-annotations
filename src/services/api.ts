import axios, {
  AxiosInstance,
} from 'axios';

// Create an Axios instance with a base URL
const api: AxiosInstance = axios.create({
  baseURL: 'https://www.alphavantage.co/',
  timeout: 5000,
});


export default api;
