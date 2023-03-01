import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
	color: 'primary' | 'green' | 'red';
}

export const Mark: FC<Props> = ({ color, ...props }) => {
	const fill = color === 'primary' ? '#651EEE' : color === 'green' ? '#30ac63' : '#cb6583';
	return (
		<svg
			className={props.className}
			width='24'
			height='48'
			viewBox='0 0 24 48'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M0 -6.5V48L12.2057 36.7213L24 48V-6.5H0Z' />
		</svg>
	);
};
