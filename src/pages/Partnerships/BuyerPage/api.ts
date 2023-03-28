import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getBuyerPageData: async () => {
		const res = await axios.get(API_URL + '/buyer_page');
		return res.data;
	}
};

export default api;
