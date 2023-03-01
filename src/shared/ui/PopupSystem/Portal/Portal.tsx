import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Portal.scss';

/**
 * Portal component params interface
 */
export interface iPortalProps {
	className?: string;
	children: ReactNode;
}

/**
 * Renders portal container
 * @return @return{React.ReactPortal}
 * @constructor
 * */

export const Portal: FC<iPortalProps> = ({ children, className = '' }) => {
	const [mounted, setMounted] = useState<Element | null>(null);

	useEffect(() => {
		const element = document.createElement('div');
		const portalElement = document.querySelectorAll('.Portal');
		let newElementClass = `portal-${portalElement.length}-${Date.now()}`;

		element.setAttribute('id', newElementClass);

		document.body.appendChild(element).className = `Portal ${className}`;

		const portal = document.querySelector(`#${newElementClass}`);

		setMounted(portal);

		return () => {
			setMounted(null);
			document.body.removeChild(element);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return mounted ? createPortal(children, mounted) : null;
};
