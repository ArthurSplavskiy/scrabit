import { FC, ReactNode } from 'react';
import './TemplateModal.scss';

interface iTemplateModalProps {
	children?: ReactNode;
}

export const TemplateModalVideo: FC<iTemplateModalProps> = ({ children }) => {
	return <div className={`TemplateModal-video`}>{children}</div>;
};
