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
import HelpCenterPage from '@/pages/HelpCenter';
import HelpCenterCategoryPage from '@/pages/HelpCenter/CategoryPage';
import HelpCenterArticlePage from '@/pages/HelpCenter/ArticlePage';
import SellMyCar from '@/pages/SellMyCar';
import CashForJunkPage from '@/pages/CashForJunkCar';
import Car from '@/pages/Car';

export enum AppRoutes {
	HOME = '/',
	LOGIN = 'login',
	REGISTER = 'register',
	BLOG = 'blog',
	ACCOUNT = 'account'
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
			},
			{
				path: '/blog',
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
			},
			{
				path: 'help-center',
				element: <HelpCenterPage />
			},
			{
				path: 'help-center/:category',
				element: <HelpCenterCategoryPage />
			},
			{
				path: 'help-center/:category/:slug',
				element: <HelpCenterArticlePage />
			},
			{
				path: '/sell-my-car',
				element: <SellMyCar />
			},
			{
				path: '/cash-for-junk-cars',
				element: <CashForJunkPage />
			},
			{
				path: '/sell-my-car/:brand/:model',
				element: <Car />
			}
		]
	}
]);

export default AppRouter;
