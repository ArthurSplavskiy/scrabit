import axios from '@/app/common/api/axios';

const api = {
	getRelatedRecords: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/article_page');
		return res.data;
	},
	getRecordBySlug: async (slug: string) => {
		const res = await axios.get(
			import.meta.env.VITE_API_URL + `/blog_records?slug=${slug}&_limit=1`
		);
		return res.data;
	}
};

export default api;
