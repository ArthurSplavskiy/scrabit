import { Logo } from '@/shared/ui/IconComponents';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { AppRoutes } from '@/app/routes';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollY } from '@/shared/hooks/useScrollY';
import Cookies from 'js-cookie';
import { MenuIcon } from './HeaderMenu/MenuIcon';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import api from '@/app/common/api';
import { Button } from '@/shared/ui/Button';
import './Header.scss';

interface Props {
	onlyLogo?: boolean;
}

export const Header: FC<Props> = ({ onlyLogo }) => {
	const { scrollY, direction } = useScrollY();
	const [menuOpen, setMenuOpen] = useState(false);
	const { isMobile, isDesktop } = useDevice();
	const { data, isLoading } = useQuery(queryKeys.commonMenu, api.common.getMenu);

	const handleClick = () => {
		setMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}, [menuOpen]);

	const HeaderSign = () =>
		Cookies.get('auth-token') ? (
			<Button customType='outline' btnTo={'/profile'} size={isDesktop ? 'small' : 'middle'}>
				Konstantine konstantinov
			</Button>
		) : (
			<Button
				customType='outline'
				iconName={!isMobile ? 'acc' : undefined}
				btnTo={'/auth/login'}
				size={isDesktop ? 'small' : 'middle'}>
				login
			</Button>
		);

	if (onlyLogo) {
		return (
			<>
				<div className='Header-preloader'></div>
				<header className={`Header Header-absolute`}>
					<div className='container'>
						<div className='Header-wrapper logo-center'>
							<div className='Header-logo'>
								<Link to={AppRoutes.HOME}>
									<Logo type={isDesktop ? 'mobile' : 'desktop'} />
								</Link>
							</div>
						</div>
					</div>
				</header>
			</>
		);
	}

	return (
		<>
			<div className='Header-preloader'></div>
			<header
				className={`Header page-offset ${scrollY > 50 ? 'Header-scroll' : ''} ${
					direction > 0 && scrollY > 768 ? 'Header-hide' : ''
				} ${isLoading ? 'Header-hide' : ''} ${menuOpen ? 'Header-fixed' : ''}`}>
				<div className='container'>
					<div className='Header-wrapper'>
						<div className='Header-menu-icon'>
							<MenuIcon active={menuOpen} onClick={handleClick} />
						</div>
						<div className='Header-logo'>
							<Link to={AppRoutes.HOME}>
								<Logo type={isDesktop ? 'mobile' : 'desktop'} />
							</Link>
						</div>
						<div className='Header-actions'>
							<HeaderMenu data={data} active={menuOpen} menuHandler={setMenuOpen} />
							<div className='Header-sign'>
								<HeaderSign />
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};
