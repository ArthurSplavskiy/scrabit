import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getStaticPageData: async (slug: string) => {
		const res = await axios.get(API_URL + `/${slug}`);
		return res.data;
	}
};

export default api;
