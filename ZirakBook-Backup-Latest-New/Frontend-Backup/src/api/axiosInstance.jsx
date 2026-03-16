import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://accounting-english-backend-production.up.railway.app';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { BASE_URL };

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming token is stored as 'token'
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
