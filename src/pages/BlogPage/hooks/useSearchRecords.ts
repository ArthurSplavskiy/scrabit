import { queryKeys } from '@/app/queryClient/queryKeys';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { useQuery } from 'react-query';
import api from '../api';

export const useSearchRecords = (search: string) => {
	return useQuery<IBlogRecord[]>([queryKeys.blogSearch, search], () => api.searchRecords(search), {
		enabled: search.length > 2
	});
};
