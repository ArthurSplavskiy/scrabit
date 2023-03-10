import { getFileSize } from '@/shared/helpers';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from '../../Button';
import { Icon } from '../../Icon/Icon';
import styles from './FileUploader.module.scss';

interface Props {
	onUploadFile: any;
	uploadFileValue: FileList | null;
}

export const FileUploader: FC<Props> = ({ onUploadFile, uploadFileValue }) => {
	const [hideInfo, setHideInfo] = useState(true);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (uploadFileValue) {
			setHideInfo(false);
		}
	}, [uploadFileValue]);

	const [fileList, setFileList] = useState<FileList | null>(null);
	const [showMaxSizeError, setShowMaxSizeError] = useState(false);

	useEffect(() => {
		if (fileList) {
			const dt = new DataTransfer();
			for (let file of fileList) {
				if (file.size < 2 * 1024 * 1024) {
					dt.items.add(file);
				} else {
					setShowMaxSizeError(true);
				}
			}
			setFileList(dt.files);
		}
		if (fileList?.length === 0) {
			setShowMaxSizeError(false);
		}
	}, [fileList]);

	return (
		<>
			{!hideInfo && (
				<div className={styles.loadFiles}>
					{fileList
						? [...fileList].map((f) => (
								<div className={styles.loadFile} key={f.name}>
									<div>
										<span className={styles.loadFileName}>{f.name}</span>
										<span className={styles.loadFileSize}>{getFileSize(f.size)}</span>
									</div>
									<button
										type='button'
										onClick={() => {
											const dt = new DataTransfer();
											for (let file of fileList) {
												dt.items.add(file);
											}
											for (let i = 0; i < dt.items.length; i++) {
												if (f.name === dt.items[i].getAsFile()?.name) {
													dt.items.remove(i);
													continue;
												}
											}

											if (inputRef.current) inputRef.current.files = dt.files;
											setFileList(dt.files);
										}}>
										<Icon icon='close' size='10' />
									</button>
								</div>
						  ))
						: null}
					{showMaxSizeError && <span className={styles.loadFilesMaxSize}>Max file size 2MB</span>}
				</div>
			)}
			<div className={'Button-upload'}>
				<input
					ref={inputRef}
					id='inputUpload'
					type='file'
					multiple
					accept='application/pdf,image/*'
					onChange={(e) => {
						onUploadFile(e);
						setFileList(e.target.files);
					}}
				/>
				<Button type='button' customType='text-underline' iconName='upload' iconPosition='right'>
					upload files
				</Button>
			</div>
		</>
	);
};
