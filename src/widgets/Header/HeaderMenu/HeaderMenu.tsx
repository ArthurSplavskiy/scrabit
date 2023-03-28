import { Button } from '@/shared/ui/Button';
import { scrollToBlock } from '@/shared/helpers/scrollToBlock';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { ICommonContacts } from '@/app/common/api/interfaces';
import { IMenu } from '../interfaces';
import api from '@/app/common/api';
import { Icon } from '@/shared/ui/Icon/Icon';
import classNames from 'classnames';
import './HeaderMenu.scss';
import useIsFirstRender from '@/shared/hooks/useIsFirstRender';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data?: IMenu[];
	active: boolean;
	menuHandler: (s: boolean) => void;
}

interface ISublistItemProps extends Omit<IMenu, 'id' | 'anchor'> {
	menuHandler: (s: boolean) => void;
}
const SublistItem: FC<ISublistItemProps> = ({ name, slug, sublist, menuHandler }) => {
	const [isSublistOpen, setIsSublistOpen] = useState(false);
	const [itemHeight, setItemHeight] = useState(0);
	const sublistRef = useRef<HTMLUListElement>(null);
	const isFirstRender = useIsFirstRender();

	useEffect(() => {
		if (!isFirstRender) {
			setItemHeight((prev) => (prev > 0 ? 0 : sublistRef.current?.scrollHeight || 0));
		}
	}, [isSublistOpen]);

	return (
		<>
			<Link
				onClick={() => setIsSublistOpen((prev) => !prev)}
				to={`/#${slug}`}
				reloadDocument={false}
				className={classNames('HeaderMenu-sublist-link', {
					open: isSublistOpen
				})}>
				{name} {sublist && <Icon icon={isSublistOpen ? 'minus' : 'plus'} color='blue' size='24' />}
			</Link>
			<ul
				ref={sublistRef}
				className={classNames('HeaderMenu-sublist', {
					open: isSublistOpen
				})}
				style={{ height: itemHeight + 'px' }}>
				{sublist?.map((item) => (
					<li key={item.id}>
						<Link
							className='text-18'
							to={item.link}
							onClick={() => {
								menuHandler(false);
							}}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export const HeaderMenu: FC<Props> = ({ data, active, menuHandler, ...props }) => {
	const { isDesktop } = useDevice();
	const location = useLocation();
	const { data: contacts } = useQuery<ICommonContacts>(
		queryKeys.commonContacts,
		api.common.getContacts
	);
	const handleClick = (hash: string) => {
		scrollToBlock(hash);
		menuHandler(false);
	};

	return (
		<nav className={`${props.className} HeaderMenu ${active && 'HeaderMenu-active'}`}>
			<ul className='HeaderMenu-list'>
				{!isDesktop
					? data
							?.filter((item) => !item.sublist)
							.map((item) => (
								<li
									className={classNames('HeaderMenu-item text-16', {
										active: location.pathname === `/${item.slug}`
									})}
									key={item.slug}>
									<Link
										onClick={() => handleClick(item.slug)}
										to={item.anchor ? `/#${item.slug}` : `/${item.slug}`}
										reloadDocument={false}>
										{item.name}
									</Link>
								</li>
							))
					: data?.map((item) => (
							<li className='HeaderMenu-item text-16' key={item.slug}>
								{item.sublist ? (
									<SublistItem
										name={item.name}
										slug={item.slug}
										sublist={item.sublist}
										menuHandler={menuHandler}
									/>
								) : (
									<Link
										onClick={() => handleClick(item.slug)}
										to={item.anchor ? `/#${item.slug}` : `/${item.slug}`}
										reloadDocument={false}>
										{item.name}
									</Link>
								)}
							</li>
					  ))}
			</ul>
			<div className='HeaderMenu-footer'>
				<div className='HeaderMenu-contacts'>
					<span className='text-14'>{contacts?.address}</span> <br />
					<a href={`tel:${contacts?.phone}`}>{contacts?.phone}</a>
				</div>
				<Button btnLink={contacts?.contact_us_link} size='middle'>
					contact us
				</Button>
			</div>
		</nav>
	);
};
