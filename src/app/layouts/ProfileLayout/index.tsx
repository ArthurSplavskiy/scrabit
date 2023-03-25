import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Preloader } from '@/widgets/Preloader';
import { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import './index.module.scss';

const ProfileLayout: FC = () => {
	return (
		<div className='ProfileLayout'>
			<Preloader />
			<ScrollRestoration />
			<Header />
			<div className='ProfileLayout-main'>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfileLayout;
