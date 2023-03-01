import { eventBus } from '@/shared/helpers/EventBus/EventBus';
import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';

interface Props {
	id?: number;
	question?: string;
	answer?: string;
	open?: boolean;
	expand?: (id: number) => void;
}

export const Spoller: FC<Props> = ({ id, question, answer, open, expand }) => {
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
		<div className={`Spoller ${isOpen && 'open'}`}>
			<div className={`Spoller-head`} onClick={handleClick}>
				<span>{question}</span>
				<Icon icon='arrow-down' />
			</div>
			<div ref={answerRef} className='Spoller-body' style={{ height: itemHeight + 'px' }}>
				{answer}
			</div>
		</div>
	);
};
