import { IBuyerFaqs } from '@/widgets/Partnerships/FaqsBlock';
import { ICharityApiData } from '@/widgets/Partnerships/FormBlock/Forms/CharityForm/interface';
import { IBuyer } from '@/widgets/Partnerships/PersonBlock';

export interface ICharityPageData {
	hero_section: {
		title: string;
		subtitle: string;
	};
	buyer: IBuyer;
	faq: IBuyerFaqs;
	form: {
		category: string;
		title: string;
		selects: ICharityApiData;
	};
}
