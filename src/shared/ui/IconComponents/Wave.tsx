import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
	color: 'primary' | 'green' | 'red';
}

export const Wave: FC<Props> = ({ color, ...props }) => {
	const fill = color === 'primary' ? '#651EEE' : color === 'green' ? '#30ac63' : '#cb6583';
	return (
		<svg
			className={props.className}
			width='424'
			height='93'
			viewBox='0 0 424 93'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M190.5 40.5001C114.1 40.5001 47.5 5 0 0.500122L-16 140H525.5L532.75 107.75L540 75.5002C535.333 60.0002 537 60.4999 452 20.5C346.589 -29.1052 286 40.5001 190.5 40.5001Z' />
		</svg>
	);
};
