import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '@/app/layouts/PageLayout';
import ErrorPage from '@/pages/ErrorsPage';
import HomePage from '@/pages/HomePage';

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
	}
]);

export default AppRouter;
