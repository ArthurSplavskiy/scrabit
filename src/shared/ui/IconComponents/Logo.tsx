interface Props {
	type: 'desktop' | 'mobile';
}
export const Logo: React.FC<Props> = ({ type }) => {
	return (
		<>
			{type === 'desktop' && (
				<img src='/images/logo.svg' alt='scrabit' style={{ width: '227px', height: '42px' }} />
			)}
			{type === 'mobile' && <img src='/images/logo-mobile.svg' alt='scrabit' />}
		</>
	);
};
