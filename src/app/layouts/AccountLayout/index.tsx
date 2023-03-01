import { Header } from '@/widgets/Header';
import { PrivatePopups } from '@/shared/ui/PopupSystem/privatePopups';
import { AccountProvider } from '@/app/context/Account/AccountContextProvider';
import { AppRoutes } from '@/app/routes';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import './AccountLayout.scss';

export async function accountLayoutLoader() {
	const token = Cookies.get('auth-token');
	if (!token) {
		return redirect(AppRoutes.HOME);
	}
	return null;
}

const AccountLayout: FC = () => {
	return (
		<AccountProvider>
			<div className='AccountLayout'>
				<Header type='account' />
				<div className='AccountLayout-main'>
					<Outlet />
				</div>
				<PrivatePopups />
			</div>
		</AccountProvider>
	);
};

export default AccountLayout;
