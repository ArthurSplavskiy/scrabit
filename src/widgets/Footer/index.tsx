import { Logo } from '@/shared/ui/IconComponents';
import { FC, Fragment } from 'react';
import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import api from '@/app/common/api';
import './Footer.scss';
import { ICommonContacts, ICommonPromoCars, ICommonStaticPages } from '@/app/common/api/interfaces';
import { IMenu } from '../Header/interfaces';
import { Link } from 'react-router-dom';
import { scrollToBlock } from '@/shared/helpers/scrollToBlock';
import { useDevice } from '@/app/context/Device/DeviceContext';

export const Footer: FC = () => {
	const { data: menu } = useQuery<IMenu[]>(queryKeys.commonMenu, api.common.getStaticPages);
	const { data: contacts } = useQuery<ICommonContacts>(
		queryKeys.commonContacts,
		api.common.getContacts
	);
	const { data: staticPages } = useQuery<ICommonStaticPages[]>(
		queryKeys.commonStaticPages,
		api.common.getStaticPages
	);
	const { data: promoCars } = useQuery<ICommonPromoCars[]>(
		queryKeys.commonPromoCars,
		api.common.getPromoCars
	);
	const { isMobile } = useDevice();

	return (
		<footer className='Footer'>
			<MovingTiters text='scrabit' speed={50} />
			<div className='container'>
				<div className='Footer-wrapper'>
					<div className='Footer-top'>
						{/* col */}
						<div className='Footer-col'>
							<Logo type={'desktop'} />
							<div className='Footer-contacts'>
								<span className='text-14'>{contacts?.address}</span> <br />
								<a href={`tel:${contacts?.phone}`}>{contacts?.phone}</a>
							</div>
						</div>
						{/* col */}
						<div className='Footer-col'>
							<nav className='Footer-menu'>
								<h3 className='Footer-menu-head text-18-14'>More</h3>
								<ul>
									{menu
										?.filter((el) => !el.sublist)
										.map((item, idx) => (
											<li className='text-16-14' key={idx}>
												<Link
													onClick={() => scrollToBlock(item.slug)}
													to={item.anchor ? `/#${item.slug}` : `/${item.slug}`}
													reloadDocument={false}>
													{item.name}
												</Link>
											</li>
										))}
								</ul>
							</nav>
						</div>
						{/* col */}
						{menu
							?.filter((el) => el.sublist)
							.map((item) => (
								<div key={item.id} className='Footer-col'>
									<nav className='Footer-menu'>
										<h3 className='Footer-menu-head text-18-14'>{item.name}</h3>
										<ul>
											{item.sublist?.map((item, idx) => (
												<li className='text-16-14' key={idx}>
													<Link to={item.link} reloadDocument={false}>
														{item.name}
													</Link>
												</li>
											))}
										</ul>
									</nav>
								</div>
							))}
						{/* col */}
						<div className='Footer-col Footer-col-promo-cars'>
							<nav className='Footer-menu'>
								<ul>
									{promoCars?.map((item) => (
										<li className='text-16-14' key={item.slug}>
											<Link to={`${item.slug}`} reloadDocument={false}>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
			<div className='Footer-copyright'>
				<div className='Footer-copyright-top'>
					<div className='container'>
						<div className='Footer-copyright-top-content'>
							{isMobile && (
								<ul className='Footer-static-pages'>
									{staticPages?.map((s) => (
										<li className='text-16-14' key={s.id}>
											<Link to={`/${s.slug}`}>{s.name}</Link>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
				<div className='Footer-copyright-bottom'>
					<div className='container'>
						<div className='Footer-copyright-bottom-content'>
							{!isMobile && (
								<ul className='Footer-static-pages'>
									{staticPages?.map((s) => (
										<li className='text-16-14' key={s.id}>
											<Link to={`/${s.slug}`}>{s.name}</Link>
										</li>
									))}
								</ul>
							)}
							<span className='text-16-14'>© {new Date().getFullYear()} SCRABIT</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
