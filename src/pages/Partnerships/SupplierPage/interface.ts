import { IBuyerFaqs } from '@/widgets/Partnerships/FaqsBlock';
import { ICharityApiData } from '@/widgets/Partnerships/FormBlock/Forms/CharityForm/interface';
import { IBuyer } from '@/widgets/Partnerships/PersonBlock';

export interface ISupplierPageData {
	hero_section: {
		title: string;
		subtitle: string;
		message: string;
	};
	buyer: IBuyer;
	faq: IBuyerFaqs;
	form: {
		category: string;
		title: string;
		selects: ICharityApiData;
	};
}
