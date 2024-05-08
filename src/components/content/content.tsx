import { Avatar, Box, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { calculateEstimatedTimeToRead } from 'src/helpers/time.format';
import { ContentProps } from './content.props';

const Content = ({ blogs }: ContentProps) => {
	const router = useRouter();

	return (
		<Box width={{ xs: '100%', md: '70%' }}>
			{blogs.map(item => (
				<Box
					key={item.id}
					sx={{
						backgroundColor: 'rgba(0, 0, 0, .5)',
						p: '20px',
						mt: '20px',
						borderRadius: '8px',
						boxShadow: '0px 8px 16px rgba(255, 255, 255, .1)',
						cursor: 'pointer',
					}}
					onClick={() => router.push(`/blog/${item.slug}`)}
				>
					<Box position={'relative'} width={'100%'} height={{ xs: '30vh', md: '50vh' }}>
						<Image
							src={item.image.url}
							alt={item.title}
							fill
							style={{ objectFit: 'cover', borderRadius: '10px' }}
						/>
					</Box>
					<Typography variant='h4' mt={'30px'}>
						{item.title}
					</Typography>
					<Typography variant='body1' mt={'10px'} color={'gray'}>
						{item.excerpt}
					</Typography>
					<Divider sx={{ mt: '30px' }} />
					<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', mt: '20px' }}>
						<Avatar alt={item.author.name} src={item.author.avatar.url} />
						<Box>
							<Typography variant='body2'>{item.author.name}</Typography>
							<Box color={'gray'} sx={{ opacity: '.6' }}>
								{' '}
								{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
								{calculateEstimatedTimeToRead(item.description.text)}min read
							</Box>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default Content;
