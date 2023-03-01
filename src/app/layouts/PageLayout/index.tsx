import { CookieBanner } from '@/widgets/CookieBanner';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import './PageLayout.scss';

const PageLayout: FC = () => {
	return (
		<div className='PageLayout'>
			<ScrollRestoration />
			<Header />
			<div className='PageLayout-main page-offset'>
				<Outlet />
			</div>
			<CookieBanner />
			<Footer />
		</div>
	);
};

export default PageLayout;
