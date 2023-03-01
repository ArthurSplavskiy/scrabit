import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '@/app/layouts/PageLayout';
import ErrorPage from '@/pages/ErrorsPage';
import HomePage from '@/pages/HomePage';
import AccountLayout, { accountLayoutLoader } from '@/app/layouts/AccountLayout';
import { AccountDashboard } from '@/pages/AccountPage/AccountDashboard';
import { AccountSettings } from '@/pages/AccountPage/AccountSettings';
import PrivacyPage from '@/pages/PrivacyPage';

export enum AppRoutes {
	HOME = '/',
	ACCOUNT_DASHBOARD = '/account/dashboard',
	PRIVACY_POLICY = '/privacy-policy',
	LOGIN = '/login'
}

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <PageLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <HomePage />
			}
		]
	},
	{
		element: <AccountLayout />,
		errorElement: <ErrorPage />,
		loader: accountLayoutLoader,
		children: [
			{
				path: '/account/dashboard',
				element: <AccountDashboard />
			},
			{
				path: '/account/settings',
				element: <AccountSettings />
			}
		]
	},
	{
		path: '/privacy-policy',
		element: <PageLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/privacy-policy',
				element: <PrivacyPage />
			}
		]
	}
]);

export default AppRouter;
