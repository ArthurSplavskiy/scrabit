import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getCharityPageData: async () => {
		const res = await axios.get(API_URL + '/charity_page');
		return res.data;
	}
};

export default api;
