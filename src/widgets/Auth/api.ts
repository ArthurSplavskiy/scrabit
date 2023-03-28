import { TLoginPostData, TRegistrationPostData } from './interface';
import axios from '@/app/common/api/axios';

const api = {
	registration: (data: Partial<TRegistrationPostData>) => axios.post('/register', data),
	login: (data: TLoginPostData) => axios.post('/login', data),
	forgotPassword: (data: any) => axios.post('/v1/auth/forgot/password', data),
	getProfile: () => axios.get('/profile')
};

export default api;
