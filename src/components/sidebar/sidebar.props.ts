import { BlogsType } from 'src/interfaces/blog.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';

export interface SidebarProps {
	latestBlog: BlogsType[];
	categories: CategoriesType[];
}
