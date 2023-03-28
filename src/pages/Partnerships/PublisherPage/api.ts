import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getPublisherPageData: async () => {
		const res = await axios.get(API_URL + '/publisher_page');
		return res.data;
	}
};

export default api;
