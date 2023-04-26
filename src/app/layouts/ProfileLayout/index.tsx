import { Header } from '@/widgets/Header';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import './index.module.scss';

export async function accountLayoutLoader() {
	const token = Cookies.get('auth-token');
	if (!token) {
		// return redirect('/');
	}
	return null;
}

const onlyLogoRoutes = (routes: string[], pathname: string): boolean => {
	for (let r of routes) {
		if (r === pathname) return true;
	}
	return false;
};

const ProfileLayout: FC = () => {
	const { pathname } = useLocation();
	return (
		<div className='ProfileLayout'>
			<ScrollRestoration />
			<Header
				onlyLogo={onlyLogoRoutes(
					['/settings/change-password', '/auth/login', '/auth/registration'],
					pathname
				)}
			/>
			<div className='ProfileLayout-main'>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfileLayout;
