import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Content } from 'src/components';
import { CategoriesType } from 'src/interfaces/categories.interface';
import Layout from 'src/layout/layout';
import SEO from 'src/layout/seo/seo';
import { BlogsService } from 'src/services/blog.service';

const BlogPage = ({ ciscoCategory }: BlogPageProps) => {
	const blogs = ciscoCategory.map(item => item.blogs).flat();

	return (
		<SEO metaTitle='All Blogs'>
			<Layout>
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						flexDirection: { xs: 'column', md: 'row' },
						padding: '20px',
						justifyContent: 'center',
					}}
				>
					<Content blogs={blogs} title='CCNA Module' />
				</Box>
			</Layout>
		</SEO>
	);
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
	const blogs = await BlogsService.getBlog();

	return {
		props: {
			ciscoCategory: blogs.map((item: CategoriesType) => item),
		},
	};
};

interface BlogPageProps {
	ciscoCategory: CategoriesType[];
}
