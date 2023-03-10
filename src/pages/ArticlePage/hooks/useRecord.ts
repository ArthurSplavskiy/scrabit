import { queryKeys } from '@/app/queryClient/queryKeys';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { useQuery } from 'react-query';
import api from '../api';

export const useRecord = (slug: string) => {
	const { data, isLoading } = useQuery<IBlogRecord[]>(
		[queryKeys.article, slug],
		() => api.getRecordBySlug(slug),
		{
			enabled: !!slug
		}
	);
	return { data: data?.[0], isLoading };
};
