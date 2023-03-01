import { Button } from '@/shared/ui/Button';
import './index.scss';

export const ErrorPage404 = () => {
	//const { pageInterfaceText } = useCommon();

	return (
		<div className='Page-404'>
			<div className='Page-404-image-ibg'>
				<img src='/images/bg-404.svg' alt='smoke' />
			</div>
			{/* <Button className='Page-404-back-btn' btnLink={true} link='/'>
				{pageInterfaceText?.back_home}
			</Button> */}
		</div>
	);
};
