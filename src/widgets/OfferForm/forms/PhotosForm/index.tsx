import { Button } from '@/shared/ui/Button';
import { IOfferData, initialOfferData } from '../../initialOfferData';
import { FC, useEffect, useState } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ProgressRing } from '@/shared/ui/ProgressRing';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import styles from './index.module.scss';
import mainStyles from '../../index.module.scss';
import { BackButton } from '../../ui/BackButton';
import { NextButton } from '../../ui/NextButton';

interface Props {
	setStep: (...args: any[]) => void;
}

export const PhotosForm: FC<Props> = ({ setStep }) => {
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [images, setImages] = useState([]);
	const maxNumber = 10;
	const maxFileSize = 1 * 1024 * 1024; // 5 Мб

	const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
		setImages(imageList as never[]);
		setOfferData((prev) => ({
			...prev,
			photos: imageList as never[]
		}));
	};

	useEffect(() => {
		if (offerData.photos) setImages(offerData.photos);
	}, []);

	return (
		<div className={styles.form}>
			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
				acceptType={['jpg', 'jpeg', 'png']}>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
					errors
				}) => (
					<div className={styles.uploader}>
						{/* <button
							style={isDragging ? { color: 'red' } : undefined}
							onClick={onImageUpload}
							{...dragProps}>
							Click or Drop here
						</button> */}
						{/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
						<div className={styles.uploaderZone}>
							<div className={styles.uploaderImageList}>
								{imageList.map((image, index) => (
									<div key={index} className={styles.uploaderImage}>
										<img src={image.dataURL} alt='upload photo' />
										<div className={styles.uploaderImageBackdrop}>
											{/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
											<button onClick={() => onImageRemove(index)}>
												<Icon icon='close' size='10' color='white' />
												<ProgressRing progress={100} />
											</button>
										</div>
									</div>
								))}
							</div>
							<h3>upload your photos</h3>
							<p className='text-16'>Suitable car photo formats .jpg .jpeg .png</p>
							{errors && (
								<div className={styles.uploaderErrors}>
									{errors.maxNumber && (
										<span className='text-16'>Number of selected images exceed {maxNumber}</span>
									)}
									{errors.acceptType && (
										<span className='text-16'>Your selected file type is not allow</span>
									)}
									{errors.maxFileSize && (
										<span className='text-16'>Selected file size exceed {maxFileSize}</span>
									)}
									{errors.resolution && (
										<span className='text-16'>
											Selected file is not match your desired resolution
										</span>
									)}
								</div>
							)}
						</div>
						<Button
							style={isDragging ? { color: 'red' } : undefined}
							onClick={onImageUpload}
							iconName='upload'
							iconPosition='right'
							className={styles.uploaderBtn}
							{...dragProps}>
							upload files
						</Button>
					</div>
				)}
			</ImageUploading>
			<div className={mainStyles.offerFormContentNav}>
				<BackButton setStep={setStep} />
				<NextButton setStep={setStep} />
			</div>
		</div>
	);
};
