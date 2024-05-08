import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Content, Sidebar } from 'src/components';
import { BlogsType } from 'src/interfaces/blog.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';
import Layout from 'src/layout/layout';
import SEO from 'src/layout/seo/seo';
import { BlogsService } from 'src/services/blog.service';

const DetailCategoryBlog = ({ blogs, latestBlog, categories }: DetailCategoryBlogProps) => {
	const router = useRouter();

	return (
		<SEO metaTitle={`${router.query.slug} - category`}>
			<Layout>
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						flexDirection: { xs: 'column', md: 'row' },
						padding: '20px',
					}}
				>
					<Sidebar latestBlog={latestBlog} categories={categories} />
					<Content blogs={blogs} />
				</Box>
			</Layout>
		</SEO>
	);
};

export default DetailCategoryBlog;

export const getServerSideProps: GetServerSideProps<DetailCategoryBlogProps> = async ({
	query,
}) => {
	const blogs = await BlogsService.getDetailedCategorisBlog(query.slug as string);
	const latestBlog = await BlogsService.getLatestBlog();
	const categories = await BlogsService.getCategories();

	return {
		props: {
			blogs,
			latestBlog,
			categories,
		},
	};
};

interface DetailCategoryBlogProps {
	blogs: BlogsType[];
	latestBlog: BlogsType[];
	categories: CategoriesType[];
}
