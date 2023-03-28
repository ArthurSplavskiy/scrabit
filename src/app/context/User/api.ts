import axios from '@/app/common/api/axios';

const api = {
	getProfile: () => axios.get('/profile')
};

export default api;
