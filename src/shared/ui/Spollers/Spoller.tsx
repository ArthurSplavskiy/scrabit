import { withZero } from '@/shared/helpers';
import { eventBus } from '@/shared/helpers/EventBus/EventBus';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon/Icon';

interface Props {
	id?: number;
	question?: string;
	answer?: string;
	open?: boolean;
	btnLink?: string;
	expand?: (id: number) => void;
	size?: 'big' | 'small';
}

export const Spoller: FC<Props> = ({ id, question, answer, open, expand, btnLink, size }) => {
	const [isOpen, setIsOpen] = useState(open);
	const [itemHeight, setItemHeight] = useState(0);
	const answerRef = useRef<HTMLDivElement>(null);
	const handleClick = () => {
		expand?.(id || 0);
	};

	useEffect(() => {
		if (open) {
			setItemHeight((prev) => (prev > 0 ? 0 : answerRef.current?.scrollHeight || 0));
			setIsOpen((prev) => !prev);
		} else {
			setItemHeight(0);
			setIsOpen(false);
		}
	}, [open]);

	return (
		<div className={`Spoller ${isOpen && 'open'} ${size ? size : ''}`}>
			<div className={`Spoller-head`} onClick={handleClick}>
				<span className={size === 'small' ? 'text-18-14' : 'text-40-16'}>
					<span className={`Spoller-id`}>{withZero((id || 0) + 1)}</span>
					{question}
				</span>
				<Icon icon={`${isOpen ? 'minus' : 'plus'}`} size='24' />
			</div>
			<div
				ref={answerRef}
				className='Spoller-body text-16-14'
				style={
					window.innerWidth < 412
						? { height: itemHeight + (isOpen ? 30 : 0) + 'px' }
						: { height: itemHeight + 'px' }
				}>
				{answer}
				{btnLink ? (
					<Button btnTo={btnLink} customType='outline'>
						read more
					</Button>
				) : null}
			</div>
		</div>
	);
};
