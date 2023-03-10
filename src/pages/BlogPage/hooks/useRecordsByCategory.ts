import { queryKeys } from '@/app/queryClient/queryKeys';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { useQuery } from 'react-query';
import api from '../api';

export const useRecordsByCategory = (category: string) => {
	return useQuery<IBlogRecord[]>(
		[queryKeys.blogCategories, category],
		() => api.findRecordsByCategory(category),
		{
			enabled: !!category
		}
	);
};
