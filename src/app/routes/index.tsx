import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '@/app/layouts/PageLayout';
import ErrorPage from '@/pages/ErrorsPage';
import HomePage from '@/pages/HomePage';
import BlogPage from '@/pages/BlogPage';
import ArticlePage from '@/pages/ArticlePage';
import BuyerPage from '@/pages/Partnerships/BuyerPage';
import CarrierPage from '@/pages/Partnerships/CarrierPage';
import PublisherPage from '@/pages/Partnerships/PublisherPage';
import CharityPage from '@/pages/Partnerships/CharityPage';
import SupplierPage from '@/pages/Partnerships/SupplierPage';

export enum AppRoutes {
	HOME = '/',
	LOGIN = 'login',
	REGISTER = 'register',
	BLOG = 'blog',
	ACCOUNT = 'account'
}

const AppRouter = createBrowserRouter([
	{
		path: AppRoutes.HOME,
		element: <PageLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: AppRoutes.HOME,
				element: <HomePage />
			},
			{
				path: AppRoutes.BLOG,
				element: <BlogPage />
			},
			{
				path: 'blog/:category/:slug',
				element: <ArticlePage />
			},
			{
				path: 'partnerships/buyer',
				element: <BuyerPage />
			},
			{
				path: 'partnerships/carrier',
				element: <CarrierPage />
			},
			{
				path: 'partnerships/publisher',
				element: <PublisherPage />
			},
			{
				path: 'partnerships/charity',
				element: <CharityPage />
			},
			{
				path: 'partnerships/supplier',
				element: <SupplierPage />
			}
		]
	}
]);

export default AppRouter;
