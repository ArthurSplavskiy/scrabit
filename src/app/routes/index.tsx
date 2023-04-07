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
import CarModelPage from '@/pages/SellMyCar/CarModelPage';
import CarBrandPage from '@/pages/SellMyCar/CarBrandPage';
import ProfileLayout, { accountLayoutLoader } from '../layouts/ProfileLayout';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage';
import ComingSoon from '@/pages/ComingSoon';
import ProfilePage from '@/pages/Profile';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import StaticPage from '@/pages/StaticPages';
import { Page404 } from '@/pages/ErrorsPage/404';
import OfferPage from '@/pages/OfferPage';

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
				element: <CarModelPage />
			},
			{
				path: '/sell-my-car/:brand',
				element: <CarBrandPage />
			}
		]
	},
	{
		path: '/auth',
		element: <ProfileLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/auth/login',
				element: import.meta.env.PROD ? <ComingSoon /> : <LoginPage />
			},
			{
				path: '/auth/registration',
				element: import.meta.env.PROD ? <ComingSoon /> : <RegistrationPage />
			}
		]
	},
	{
		path: '/profile',
		element: <ProfileLayout />,
		errorElement: <ErrorPage />,
		loader: accountLayoutLoader,
		children: [
			{
				path: '/profile',
				element: <ProfilePage />
			}
		]
	},
	{
		path: '/settings',
		element: <ProfileLayout />,
		errorElement: <ErrorPage />,
		loader: accountLayoutLoader,
		children: [
			{
				path: '/settings/change-password',
				element: <ChangePasswordPage />
			}
		]
	},
	{
		path: '/instant-offer',
		element: <ProfileLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/instant-offer',
				element: <OfferPage />
			}
		]
	},
	{
		path: '/:slug',
		element: <PageLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/:slug',
				element: <StaticPage />
			}
		]
	},
	{
		path: '/404',
		element: <PageLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/404',
				element: <Page404 />
			}
		]
	}
]);

export default AppRouter;
