import { IBuyerFaqs } from '@/widgets/Partnerships/FaqsBlock';
import { IBuyerApiData } from '@/widgets/Partnerships/FormBlock/Forms/BuyerForm/interface';
import { IBuyer } from '@/widgets/Partnerships/PersonBlock';

export interface ICarrierPageData {
	hero_section: {
		title: string;
		subtitle: string;
	};
	buyer: IBuyer;
	faq: IBuyerFaqs;
	form: {
		category: string;
		title: string;
		selects: IBuyerApiData;
	};
}
