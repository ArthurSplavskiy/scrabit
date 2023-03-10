import { IBlogRecord, ITag } from '@/entities/BlogRecord/interface';

export interface IBlogPageData {
	hero_record: IBlogRecord & { description: string };
	top_records: IBlogRecord[];
	categories_section: Array<{ subtitle: string; tag: ITag }>;
}
