import { createBrowserRouter, redirect } from 'react-router-dom';
import { lazy } from 'react';
import Cookies from 'js-cookie';

import PageLayout from '@/app/layouts/PageLayout';
import ProfileLayout, { accountLayoutLoader } from '../layouts/ProfileLayout';

const ErrorPage = lazy(() => import('@/pages/ErrorsPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const ArticlePage = lazy(() => import('@/pages/ArticlePage'));
const BuyerPage = lazy(() => import('@/pages/Partnerships/BuyerPage'));
const CarrierPage = lazy(() => import('@/pages/Partnerships/CarrierPage'));
const PublisherPage = lazy(() => import('@/pages/Partnerships/PublisherPage'));
const CharityPage = lazy(() => import('@/pages/Partnerships/CharityPage'));
const SupplierPage = lazy(() => import('@/pages/Partnerships/SupplierPage'));
const HelpCenterPage = lazy(() => import('@/pages/HelpCenter'));
const HelpCenterCategoryPage = lazy(() => import('@/pages/HelpCenter/CategoryPage'));
const HelpCenterArticlePage = lazy(() => import('@/pages/HelpCenter/ArticlePage'));
const SellMyCar = lazy(() => import('@/pages/SellMyCar'));
const CashForJunkPage = lazy(() => import('@/pages/CashForJunkCar'));
const CarModelPage = lazy(() => import('@/pages/SellMyCar/CarModelPage'));
const CarBrandPage = lazy(() => import('@/pages/SellMyCar/CarBrandPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const ChangePasswordPage = lazy(() => import('@/pages/ChangePasswordPage'));
const StaticPage = lazy(() => import('@/pages/StaticPages'));
const OfferPage = lazy(() => import('@/pages/OfferPage'));
const Page404 = lazy(() => import('@/pages/ErrorsPage/404'));

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
				element: <LoginPage /> // import.meta.env.PROD ? <ComingSoon /> : <LoginPage />
			},
			{
				path: '/auth/registration',
				element: <RegistrationPage /> // import.meta.env.PROD ? <ComingSoon /> : <RegistrationPage />
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
		path: '/offer',
		element: <ProfileLayout />,
		loader: async () => {
			if (Cookies.get('first-offer-form-is-filled') === 'false') {
				return redirect('/');
			}
			return null;
		},
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/offer',
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
