import { eventBus } from '@/shared/helpers/EventBus/EventBus';
import { useOneOpen } from '@/shared/hooks/useOneOpen';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { Spoller } from './Spoller';
import './Spollers.scss';

interface Props {
	data?: any[];
	isOneOpen?: boolean;
	size?: 'big' | 'small';
}

export const Spollers: FC<Props> = ({ data, size, isOneOpen }) => {
	//const [oneOpen, setOneOpen] = useState(isOneOpen || false);
	const { newData, setNewData, toggle } = useOneOpen(data);
	const spollersRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data?.length) {
			setNewData(
				data?.map((item, index) => ({
					...item,
					id: index,
					open: false
				}))
			);
		}
	}, [data, setNewData]);

	return (
		<div
			ref={spollersRef}
			className={classNames('Spollers', {
				'Spollers-small': size === 'small'
			})}>
			{newData?.length &&
				newData?.map((s) => (
					<Spoller
						id={s.id}
						key={s.id}
						open={s.open}
						answer={s.text}
						question={s.title}
						btnLink={s?.slug}
						expand={toggle}
						size={size}
					/>
				))}
		</div>
	);
};
