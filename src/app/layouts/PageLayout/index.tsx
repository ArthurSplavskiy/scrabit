import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Preloader } from '@/widgets/Preloader';
import { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import './PageLayout.scss';

const PageLayout: FC = () => {
	return (
		<div className='PageLayout'>
			<Preloader />
			<ScrollRestoration />
			<Header />
			<div className='PageLayout-main page-offset'>
				<Outlet />
			</div>
			{/* <CookieBanner /> */}
			<Footer />
		</div>
	);
};

export default PageLayout;
