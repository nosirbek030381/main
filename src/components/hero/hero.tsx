import { Avatar, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { calculateEstimatedTimeToRead } from 'src/helpers/time.format';
import { HeroProps } from './hero.props';

const Hero = ({ blogs }: HeroProps) => {
	const router = useRouter();

	return (
		<Box width={'100%'} height={'70vh'} sx={{ backgroundColor: 'crimson' }}>
			<Carousel
				responsive={{
					mobile: {
						breakpoint: { max: 4000, min: 0 },
						items: 1,
					},
				}}
			>
				{blogs.map(item => (
					<Box
						key={item.id}
						sx={{ cursor: 'pointer' }}
						onClick={() => router.push(`/blog/${item.slug}`)}
					>
						<Box sx={{ position: 'relative', width: '100%', height: '70vh' }}>
							<Image
								src={item.image.url}
								alt={item.title}
								fill
								style={{ objectFit: 'cover' }}
								priority
							/>
							<Box
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: 'rgba(0, 0, 0, .6)',
								}}
							/>
							<Box
								width={{ xs: '100%', md: '70%' }}
								position={'relative'}
								color={'white'}
								sx={{
									top: '50%',
									transform: 'translateY(-50%)',
									paddingLeft: { xs: '10px', md: '50px' },
								}}
								zIndex={999}
							>
								<Typography sx={{ fontSize: { xs: '30px', md: '50px' } }}>{item.title}</Typography>
								<Typography sx={{ fontSize: { xs: '20px', md: '30px' }, color: 'gray' }}>
									{item.excerpt}
								</Typography>
								<Box sx={{ display: 'flex', gap: '10px', mt: '20px' }}>
									<Avatar alt={item.author.name} src={item.author.avatar.url} />
									<Box>
										<Typography>{item.author.name}</Typography>
										<Box>
											{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022;
											{calculateEstimatedTimeToRead(item.description.text)}min read
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default Hero;

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
