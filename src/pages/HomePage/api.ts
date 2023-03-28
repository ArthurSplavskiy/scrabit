import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getHomePageData: async () => {
		const res = await axios.get(API_URL + '/home_page');
		return res.data;
	}
};

export default api;
