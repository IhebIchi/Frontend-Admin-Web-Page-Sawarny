import axios from 'axios';
import { message } from 'antd';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Auth-Token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('Auth-Token');
            window.location.href = '/login';
            message.error(error.response.data.message || 'Unauthorized. Please log in again.');
        }
        return Promise.reject(error);
    }
);

export default axiosClient;

