import { queryKeys } from '@/app/queryClient/queryKeys';
import React, { createContext, FunctionComponent, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { IHomePageData } from './interfaces';
import api from './api';

type State = {
	isLoading: boolean;
	homePageData: IHomePageData | undefined;
};
type HomePageProviderProps = { children: React.ReactNode };

const HomePageContext = createContext<State>({
	isLoading: true,
	homePageData: undefined
});

function HomePageProvider({ children }: HomePageProviderProps) {
	const { data, isLoading } = useQuery(queryKeys.pageHome, api.getHomePageData);

	const contextValue = useMemo(
		() => ({
			homePageData: data,
			isLoading
		}),
		[data, isLoading]
	);

	return <HomePageContext.Provider value={contextValue}>{children}</HomePageContext.Provider>;
}

export const withHomeContext = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
): typeof Component => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<HomePageProvider>
				<Component {...props} />
			</HomePageProvider>
		);
	};
};

function useHomePageData() {
	const context = useContext(HomePageContext);

	if (context === undefined) {
		throw new Error('useHome must be used within a HomePageProvider');
	}

	return { data: context.homePageData, isLoading: context.isLoading };
}

function useHomeOfferForm() {
	const { homePageData, isLoading } = useContext(HomePageContext);
	return { data: homePageData?.offer_form_data, isLoading };
}

function useHomeAbout() {
	const { homePageData, isLoading } = useContext(HomePageContext);
	return { data: homePageData?.about_section, isLoading };
}

function useHowItWork() {
	const { homePageData, isLoading } = useContext(HomePageContext);
	return { data: homePageData?.how_it_work_section, isLoading };
}

function useHomeReview() {
	const { homePageData, isLoading } = useContext(HomePageContext);
	return { data: homePageData?.review_section, isLoading };
}

export {
	HomePageProvider,
	useHomePageData,
	useHomeOfferForm,
	useHomeAbout,
	useHowItWork,
	useHomeReview
};
