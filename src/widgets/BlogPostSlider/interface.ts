import { IBlogRecord } from '@/entities/BlogRecord/interface';

export interface IBlogPostSlider {
	title?: string;
	subtitle?: string;
	blogposts?: IBlogRecord[];
}
