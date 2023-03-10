import { queryKeys } from '@/app/queryClient/queryKeys';
import React, { createContext, FunctionComponent, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { IBlogPageData } from './interface';
import api from './api';

type State = {
	isLoading: boolean;
	blogPageData: IBlogPageData | undefined;
};
type BlogPageProviderProps = { children: React.ReactNode };

const BlogPageContext = createContext<State>({
	isLoading: true,
	blogPageData: undefined
});

function BlogPageProvider({ children }: BlogPageProviderProps) {
	const { data, isLoading } = useQuery(queryKeys.pageBlog, api.getBlogPageData);

	const contextValue = useMemo(
		() => ({
			blogPageData: data,
			isLoading
		}),
		[data, isLoading]
	);

	return <BlogPageContext.Provider value={contextValue}>{children}</BlogPageContext.Provider>;
}

export const withBlogContext = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
): typeof Component => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<BlogPageProvider>
				<Component {...props} />
			</BlogPageProvider>
		);
	};
};

function useBlogPageData() {
	const context = useContext(BlogPageContext);

	if (context === undefined) {
		throw new Error('useBlog must be used within a BlogPageProvider');
	}

	return { data: context.blogPageData, isLoading: context.isLoading };
}

function useBlogHeroRecord() {
	const { blogPageData, isLoading } = useContext(BlogPageContext);
	return { data: blogPageData?.hero_record, isLoading };
}

function useBlogTopRecords() {
	const { blogPageData, isLoading } = useContext(BlogPageContext);
	return { data: blogPageData?.top_records, isLoading };
}

function useBlogCategories() {
	const { blogPageData, isLoading } = useContext(BlogPageContext);
	return { data: blogPageData?.categories_section, isLoading };
}

export { BlogPageProvider, useBlogHeroRecord, useBlogTopRecords, useBlogCategories };
