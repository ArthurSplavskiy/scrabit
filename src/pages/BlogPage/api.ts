import axios from '@/app/common/api/axios';

const api = {
	getBlogPageData: async () => {
		const res = await axios.get(import.meta.env.VITE_API_URL + '/blog_page');
		return res.data;
	},
	searchRecords: async (search: string) => {
		const res = await axios.get(
			import.meta.env.VITE_API_URL + `/blog_records?q=${search}&_limit=10`
		);
		return res.data;
	},
	findRecordsByCategory: async (tagSlug: string) => {
		const res = await axios.get(
			import.meta.env.VITE_API_URL + `/blog_records?tag.slug=${tagSlug}&_limit=10`
		);
		return res.data;
	}
};

export default api;
