import api from '@/app/common/api';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { AppRoutes } from '@/app/routes';
import { IHomePageData, IUserProfile } from '@/app/common/api';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type State = {
	isLoaded: boolean;
	homepageIsLoading: boolean;
	homePageData: IHomePageData | undefined;
	user: IUserProfile | null;
	token: string | null;
	setUser: (user: IUserProfile | null) => void;
	setToken: (token: string) => void;
	logOut: () => void;
	getProfileData: () => void;
};
type UserProviderProps = { children: React.ReactNode };

const UserContext = createContext<State>({
	isLoaded: false,
	homepageIsLoading: false,
	user: null,
	token: null,
	homePageData: undefined,
	setUser: () => {},
	setToken: () => {},
	logOut: () => {},
	getProfileData: () => {}
});

function UserProvider({ children }: UserProviderProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [user, setUser] = useState<IUserProfile | null>(null);
	const [token, setTokenData] = useState<string | null>(null);

	const [homePageData, setHomePageData] = useState<any | null>();
	const homepageIsLoading = false;
	const homepageData = null;

	const setToken = useCallback((tokenData: string | null) => {
		setTokenData(tokenData);
		if (tokenData) {
			Cookies.set('auth-token', tokenData);
		} else {
			Cookies.remove('auth-token');
		}
	}, []);

	const logOut = useCallback(() => {
		setToken(null);
		setUser(null);
		window.location.href = AppRoutes.HOME;
	}, []);

	const getProfileData = useCallback(async () => {
		const tokenData = Cookies.get('auth-token');
		setTokenData(tokenData || null);

		try {
			if (tokenData) {
				const { data } = await api.auth.getProfile();
				const { email } = jwt_decode(tokenData) as any;
				//console.log('tokenData', jwt_decode(tokenData));
				setUser({
					...data,
					email: email,
					password: Cookies.get('user_password_test')
				});
			}
		} catch {
			setToken(null);
		} finally {
			setIsLoaded(true);
		}
	}, [setToken]);

	useEffect(() => {
		getProfileData();
	}, [setToken]);

	useEffect(() => {
		setHomePageData(homepageData);
	}, [homepageData]);

	const contextValue = useMemo(
		() => ({
			isLoaded,
			user,
			token,
			setUser,
			setToken,
			logOut,
			getProfileData,
			homePageData,
			homepageIsLoading
		}),
		[isLoaded, user, token, setToken, logOut, getProfileData, homePageData, homepageIsLoading]
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

function useProfile() {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error('useProfile must be used within a UserProvider');
	}

	return context;
}

function useInterfaceText() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { text: homePageData?.interface, isLoading: homepageIsLoading };
}
function useMenu() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.menu, isLoading: homepageIsLoading };
}
function useHomeHero() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_hero, isLoading: homepageIsLoading };
}
function useHomeAdvantages() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_advantages, isLoading: homepageIsLoading };
}
function useHomeSpeed() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_speed, isLoading: homepageIsLoading };
}
function useHomeTarifs() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_tarifs, isLoading: homepageIsLoading };
}
function useHomeUsage() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_usage, isLoading: homepageIsLoading };
}
function useHomeSocial() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_social, isLoading: homepageIsLoading };
}
function useHomeFaq() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_faq, isLoading: homepageIsLoading };
}
function useHomeQuestion() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.home_question, isLoading: homepageIsLoading };
}
function useFooterLinks() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.footer_links, isLoading: homepageIsLoading };
}
function useProxyTarifs() {
	const { homePageData, homepageIsLoading } = useContext(UserContext);
	return { data: homePageData?.proxy_tarifs, isLoading: homepageIsLoading };
}

export {
	UserProvider,
	useProfile,
	useMenu,
	useHomeHero,
	useInterfaceText,
	useHomeAdvantages,
	useHomeSpeed,
	useHomeTarifs,
	useHomeUsage,
	useHomeSocial,
	useHomeQuestion,
	useHomeFaq,
	useFooterLinks,
	useProxyTarifs
};
