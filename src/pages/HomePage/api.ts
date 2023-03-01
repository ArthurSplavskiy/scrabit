import axios from '@/app/common/api/axios';

const api = {
	getHomePageData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/home_page');
		return res.data;
	}
};

export default api;
