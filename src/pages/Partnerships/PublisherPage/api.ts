import axios from '@/app/common/api/axios';

const api = {
	getPublisherPageData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/publisher_page');
		return res.data;
	}
};

export default api;
