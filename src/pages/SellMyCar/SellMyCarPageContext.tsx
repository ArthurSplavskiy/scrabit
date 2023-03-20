import { queryKeys } from '@/app/queryClient/queryKeys';
import React, { createContext, FunctionComponent, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { ISellMyCarPageData } from './interface';
import api from './api';

type State = {
	isLoading: boolean;
	sellMyCarPageData: ISellMyCarPageData | undefined;
};
type PageProviderProps = { children: React.ReactNode };

const PageContext = createContext<State>({
	isLoading: true,
	sellMyCarPageData: undefined
});

function PageProvider({ children }: PageProviderProps) {
	const { data, isLoading } = useQuery(queryKeys.sellMyCarPage, api.getSellMyCarPageData);

	const contextValue = useMemo(
		() => ({
			sellMyCarPageData: data,
			isLoading
		}),
		[data, isLoading]
	);

	return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>;
}

export const withContext = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
): typeof Component => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<PageProvider>
				<Component {...props} />
			</PageProvider>
		);
	};
};

function usePageData() {
	const context = useContext(PageContext);

	if (context === undefined) {
		throw new Error('useHome must be used within a HomePageProvider');
	}

	return { data: context.sellMyCarPageData, isLoading: context.isLoading };
}

function usePageAbout() {
	const { sellMyCarPageData, isLoading } = useContext(PageContext);
	return { data: sellMyCarPageData?.about_section, isLoading };
}

function usePageReview() {
	const { sellMyCarPageData, isLoading } = useContext(PageContext);
	return { data: sellMyCarPageData?.review_section, isLoading };
}

function usePageHowItWork() {
	const { sellMyCarPageData, isLoading } = useContext(PageContext);
	return { data: sellMyCarPageData?.how_it_work_section, isLoading };
}

function usePageSoldAmount() {
	const { sellMyCarPageData, isLoading } = useContext(PageContext);
	return { data: sellMyCarPageData?.sold_car_amount, isLoading };
}

export {
	PageProvider,
	usePageData,
	usePageAbout,
	usePageReview,
	usePageHowItWork,
	usePageSoldAmount
};
