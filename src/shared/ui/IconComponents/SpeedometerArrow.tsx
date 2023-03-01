import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {}

export const SpeedometerArrow: FC<Props> = ({ ...props }) => {
	return (
		<>
			<svg
				className={props.className}
				width='145'
				height='145'
				viewBox='0 0 145 145'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M26.8055 139.192L142.749 10.7733C145.023 8.25542 144.925 4.39658 142.527 1.99725C140.126 -0.405581 136.262 -0.499716 133.747 1.78331L5.64094 118.057C-0.694369 123.807 -0.934892 133.691 5.11321 139.742C11.1697 145.803 21.0637 145.552 26.8055 139.192Z'
					fill='url(#paint0_linear_632_7193)'
				/>
			</svg>
		</>
	);
};
