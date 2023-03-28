import axios, { API_URL } from '@/app/common/api/axios';

const api = {
	getFaqArticlesCategory: async () => {
		const res = await axios.get(API_URL + '/faq_articles_category');
		return res.data;
	},
	searchArticles: async (search: string) => {
		const res = await axios.get(API_URL + `/faq_articles?q=${search}&_limit=10`);
		return res.data;
	},
	findArticlesByCategory: async (tagSlug: string) => {
		const res = await axios.get(API_URL + `/faq_articles_category?slug=${tagSlug}`);
		return res.data;
	},
	getArticle: async (slug: string) => {
		const res = await axios.get(API_URL + `/faq_articles?slug=${slug}`);
		return res.data;
	}
};

export default api;
