import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { SidebarProps } from './sidebar.props';

const Sidebar = ({ latestBlog, categories }: SidebarProps) => {
	const router = useRouter();

	return (
		<Box width={{ xs: '100%', md: '30%' }}>
			<Box position={'sticky'} top={'110px'} sx={{ transition: 'all .3s ease' }}>
				<Box padding={'20px'} border={'1px solid gray'} borderRadius={'10px'}>
					<Typography variant='h5'>Latest blog</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
						{latestBlog.map(item => (
							<Box
								key={item.id}
								mt={'20px'}
								sx={{ cursor: 'pointer' }}
								onClick={() => router.push(`/blog/${item.slug}`)}
							>
								<Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
									<Image
										src={item.image.url}
										alt={item.title}
										width={100}
										height={100}
										style={{ objectFit: 'cover' }}
									/>
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<Typography variant='body1'>{item.title}</Typography>
										<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
											<Avatar alt={item.author.name} src={item.author.avatar.url} />
											<Box>
												<Typography variant='body2'>{item.author.name}</Typography>
												<Box sx={{ opacity: '.6' }}>
													{' '}
													{format(new Date(item.createdAt), 'dd MMM, yyyy')}
												</Box>
											</Box>
										</Box>
									</Box>
								</Box>
								<Divider sx={{ mt: '20px' }} />
							</Box>
						))}
					</Box>
				</Box>
				<Box padding={'20px'} border={'1px solid gray'} mt={'20px'} borderRadius={'10px'}>
					<Typography variant='h5'>Category</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
						{categories.map(nav => (
							<Fragment key={nav.slug}>
								<Button
									onClick={() => router.push(`/category/${nav.slug}`)}
									fullWidth
									sx={{ justifyContent: 'flex-start', height: '50px' }}
								>
									{nav.label}
								</Button>
								<Divider />
							</Fragment>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;

const data = [
	{
		image: 'https://media.graphassets.com/MxJZhmooRRuudoErkQ38',
		title: 'Technical SEO with Hygraph',
		exerpt: 'Get started with your SEO implementation when using a Headless CMS',
		author: {
			name: 'Nosirbek Ismoilov',
			image:
				'https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg',
		},
	},
	{
		image: 'https://media.graphassets.com/bh3K2NNtTHCN260Xfq9h',
		title: 'Union Types and Sortable Relations with Hygraph',
		exerpt: 'Learn more about Polymorphic Relations and Sortable Relations with Hygraph',
		author: {
			name: 'Ismoilov Nosirbek',
			image:
				'https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg',
		},
	},
];
