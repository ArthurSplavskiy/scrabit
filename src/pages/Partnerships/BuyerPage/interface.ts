import { IFormComponent } from '@/shared/interfaces/shared';
import { IBuyerFaqs } from '@/widgets/Partnerships/FaqsBlock';
import { IBuyerApiData } from '@/widgets/Partnerships/FormBlock/Forms/BuyerForm/interface';
import { IBuyer } from '@/widgets/Partnerships/PersonBlock';

export interface IBuyerPageData {
	hero_section: {
		title: string;
		subtitle: string;
	};
	buyer: IBuyer;
	faq: IBuyerFaqs;
	form: {
		form_fields: IFormComponent[];
		form_id: number;
		form_identifier: string;
		next_step: string;
		title: string;
		// category: string;
		// title: string;
		// selects: IBuyerApiData;
	};
}
