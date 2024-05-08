import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { navItems } from 'src/config/constants';

interface Props {
	window?: () => Window;
}

const Navbar = ({ window }: Props) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const router = useRouter();

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState);
	};

	const container = window !== undefined ? () => window().document.body : undefined;

	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingX: '20px',
				}}
			>
				<Box
					sx={{ my: 2, display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
					onClick={() => router.push('/')}
				>
					<Image src={'/favicon.ico'} alt='Logo' width={50} height={50} />
					<Typography variant='h4' fontFamily={'fantasy'} component='div'>
						Quvonchbek
					</Typography>
				</Box>
				<CloseIcon onClick={handleDrawerToggle} sx={{ cursor: 'pointer' }} />
			</Box>
			<Divider />
			<List>
				{navItems.map(item => (
					<ListItem key={item.route} disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push(item.route)}>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex' }} height={'9vh'}>
			<AppBar sx={{ backgroundColor: '#141414', height: '9vh' }} component='nav'>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Box
						sx={{
							my: 2,
							alignItems: 'center',
							gap: '5px',
							flexGrow: 1,
							display: 'flex',
							height: '100%',
							cursor: 'pointer',
						}}
						onClick={() => router.push('/')}
					>
						<Image src={'/cisco.svg'} alt='Logo' width={40} height={40} />
						<Typography variant='h4' fontFamily={'fantasy'} component='div'>
							Quvonchbek
						</Typography>
					</Box>

					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map(item => (
							<Button
								key={item.route}
								sx={{ color: '#fff' }}
								onClick={() => router.push(item.route)}
							>
								{item.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: `100%` },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

export default Navbar;
