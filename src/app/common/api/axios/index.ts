import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = import.meta.env.PROD
	? import.meta.env.VITE_API_URL
	: import.meta.env.VITE_API_URL_DEV;

const axiosInstance = axios.create({
	baseURL: API_URL // https://nestjs-boilerplate-test.fly.dev/api
});

axiosInstance.interceptors.request.use(
	(config: any) => {
		const authToken = Cookies.get('auth-token');

		if (authToken) {
			config.headers['Authorization'] = `Bearer ${authToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
