import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
	index: number;
}

export const SocialLine: FC<Props> = ({ index, ...props }) => {
	switch (index) {
		case 1: {
			return (
				<svg
					className={props.className}
					width='263'
					height='154'
					viewBox='0 0 263 154'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M1 1.17662H57.115C82.78 0.842597 143.279 1.17683 157.6 63.3047C167.479 106.164 206.5 152.988 262 152.988'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
		case 2: {
			return (
				<svg
					className={props.className}
					width='263'
					height='59'
					viewBox='0 0 263 59'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M1 1.17873H57.115C82.78 1.05555 119.221 14.633 142 29.1642C171 47.6641 206.5 57.164 262 57.164'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
		case 3: {
			return (
				<svg
					className={props.className}
					width='263'
					height='59'
					viewBox='0 0 263 59'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M1 57.1631H57.115C82.78 57.2863 119.221 43.7079 142 29.1757C171 10.6746 206.5 1.17406 262 1.17406'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
		case 4: {
			return (
				<svg
					className={props.className}
					width='263'
					height='155'
					viewBox='0 0 263 155'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M1 152.974H57.115C82.78 153.308 143.279 152.974 157.6 90.8468C167.479 47.9882 206.5 1.16416 262 1.16416'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
		case 5: {
			return (
				<svg
					className={props.className}
					width='263'
					height='155'
					viewBox='0 0 263 155'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M262 1.20396H205.885C180.22 0.869941 119.721 1.20417 105.4 63.3321C95.5208 106.191 56.5 153.016 1 153.016'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
		case 6: {
			return (
				<svg
					className={props.className}
					width='263'
					height='59'
					viewBox='0 0 263 59'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M262 1.16506H205.885C180.22 1.04188 143.779 14.6194 121 29.1505C92 47.6504 56.5 57.1503 1 57.1503'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
		case 7: {
			return (
				<svg
					className={props.className}
					width='263'
					height='59'
					viewBox='0 0 263 59'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M262 57.1494H205.885C180.22 57.2726 143.779 43.6942 121 29.1621C92 10.661 56.5 1.16039 1 1.16039'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
		case 8: {
			return (
				<svg
					className={props.className}
					width='263'
					height='155'
					viewBox='0 0 263 155'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M262 153.002H205.885C180.22 153.336 119.721 153.001 105.4 90.8742C95.5208 48.0156 56.5 1.1915 1 1.1915'
						stroke='#E0D2FC'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			);
		}
	}
	return <></>;
};
