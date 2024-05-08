import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CategoriesType } from 'src/interfaces/categories.interface';
import Layout from 'src/layout/layout';
import SEO from 'src/layout/seo/seo';
import { BlogsService } from 'src/services/blog.service';

const CategoryBlog = ({ categories, notionCategories }: CategoryBlogProps) => {
	const [expandedAccordion, setExpandedAccordion] = useState('');
	const router = useRouter();

	const handleAccordionChange = (accordionId: string) => {
		setExpandedAccordion(accordionId === expandedAccordion ? '' : accordionId);
	};

	return (
		<SEO metaTitle='All Categories'>
			<Layout>
				<Box
					width={{ xs: '100%', md: '80%' }}
					mx={'auto'}
					mt={'10vh'}
					borderRadius={'10px'}
					height={{ xs: '30vh', md: '50vh' }}
					sx={{
						backgroundColor: 'black',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						rowGap: '10px',
					}}
				>
					<Typography
						variant='h3'
						fontFamily={'cursive'}
						sx={{ position: 'fixed', top: '100px', marginBottom: '40px' }}
					>
						All Category
					</Typography>
					<>
						<Accordion
							expanded={expandedAccordion === 'ccna-categories'}
							onChange={() => handleAccordionChange('ccna-categories')}
						>
							<AccordionSummary
								expandIcon={<ArrowDropDownIcon />}
								aria-controls='panel1-content'
								id='panel1-content'
							>
								<Typography>CCNA Categories</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ width: { sm: '500px', xs: '200px' } }}>
								{categories.map(
									item =>
										item.label.startsWith('CCNA') && (
											<Typography
												key={item.slug}
												sx={{
													cursor: 'pointer',
													fontSize: '20px',
													':hover': { color: 'GrayText' },
												}}
												onClick={() => router.push(`/category/ccna-module`)}
											>
												{item.label}
											</Typography>
										)
								)}
								{notionCategories.map(
									category =>
										category.label.startsWith('CCNA') && (
											<Box key={category.slug}>
												{category.blogs.map(blog => (
													<Box key={blog.id}>
														<Link href={`${blog.notion}`} target='_blank'>
															{blog.title}
														</Link>
													</Box>
												))}
											</Box>
										)
								)}
							</AccordionDetails>
						</Accordion>

						<Accordion
							expanded={expandedAccordion === 'cisco-categories'}
							onChange={() => handleAccordionChange('cisco-categories')}
						>
							<AccordionSummary
								expandIcon={<ArrowDropDownIcon />}
								aria-controls='cisco-categories-content'
								id='cisco-categories-header'
							>
								<Typography>Cisco Categories</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ width: { sm: '500px', xs: '200px' } }}>
								{categories.map(
									item =>
										item.label.startsWith('Cisco') && (
											<Typography
												key={item.slug}
												sx={{
													cursor: 'pointer',
													fontSize: '20px',
													':hover': { color: 'GrayText' },
												}}
												onClick={() => router.push(`/category/cisco-module`)}
											>
												{item.label}
											</Typography>
										)
								)}
								{notionCategories.map(
									category =>
										category.label.startsWith('Cisco') && (
											<Box key={category.slug}>
												{category.blogs.map(blog => (
													<Box key={blog.id}>
														<Link href={`${blog.notion}`} target='_blank'>
															{blog.title}
														</Link>
													</Box>
												))}
											</Box>
										)
								)}
							</AccordionDetails>
						</Accordion>
					</>
				</Box>
			</Layout>
		</SEO>
	);
};

export default CategoryBlog;

export const getServerSideProps: GetServerSideProps<CategoryBlogProps> = async () => {
	const categories = await BlogsService.getCategories();
	const notion = await BlogsService.getCategoriesBlog();

	return {
		props: {
			categories,
			notionCategories: notion.categories.map((item: CategoriesType) => item),
		},
	};
};

interface CategoryBlogProps {
	categories: CategoriesType[];
	notionCategories: CategoriesType[];
}
