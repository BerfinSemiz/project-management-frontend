import axios from 'axios';

// Axios default ayarlarını yapıyoruz
const instance = axios.create({
  API_URL: 'http://localhost:8080', // Backend API adresi
});

// Header'a token ekliyoruz
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
