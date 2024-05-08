import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Content, Hero, Sidebar } from 'src/components';
import { BlogsType } from 'src/interfaces/blog.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';
import Layout from 'src/layout/layout';
import SEO from 'src/layout/seo/seo';
import { BlogsService } from 'src/services/blog.service';

const IndexPage = ({ blogs, latestBlog, categories }: HomePageProps) => {
	return (
		<SEO>
			<Layout>
				<Hero blogs={blogs.slice(0, 3)} />
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

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
	const blogs = await BlogsService.getAllBlogs();
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

interface HomePageProps {
	blogs: BlogsType[];
	latestBlog: BlogsType[];
	categories: CategoriesType[];
}
