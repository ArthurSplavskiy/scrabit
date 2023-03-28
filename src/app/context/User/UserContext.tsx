import api from './api';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { AppRoutes } from '@/app/routes';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IUserProfile } from '@/app/common/api/interfaces';

type State = {
	isLoaded: boolean;
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
	user: null,
	token: null,
	setUser: () => {},
	setToken: () => {},
	logOut: () => {},
	getProfileData: () => {}
});

function UserProvider({ children }: UserProviderProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [user, setUser] = useState<IUserProfile | null>(null);
	const [token, setTokenData] = useState<string | null>(null);

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
				const { data } = await api.getProfile();
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

	const contextValue = useMemo(
		() => ({
			isLoaded,
			user,
			token,
			setUser,
			setToken,
			logOut,
			getProfileData
		}),
		[isLoaded, user, token, setToken, logOut, getProfileData]
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

export { UserProvider, useProfile };
