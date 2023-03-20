import { queryKeys } from '@/app/queryClient/queryKeys';
import { ArticleFAQ } from '@/entities/HelpArticle/HelpArticleTypes';
import { useQuery } from 'react-query';
import api from '../api';

export const useSearchArticles = (search: string) => {
	return useQuery<ArticleFAQ[]>(
		[queryKeys.helpCenterSearch, search],
		() => api.searchArticles(search),
		{
			enabled: search.length > 2
		}
	);
};
