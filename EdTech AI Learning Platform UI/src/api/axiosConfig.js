import axios from 'axios';

// Backend ka base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api/generate', // Aapka backend URL
});

export default api;
