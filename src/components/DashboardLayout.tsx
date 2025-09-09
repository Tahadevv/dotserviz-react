'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import UsersPage from '@/app/dashboard/users/page';
import PostsPage from '@/app/dashboard/posts/page';
import ProfilePage from '@/app/dashboard/profile/page';

const drawerWidth = 240;

const menuItems = [
  { text: 'Users', icon: <PeopleIcon />, component: 'users' },
  { text: 'Posts', icon: <ArticleIcon />, component: 'posts' },
  { text: 'Profile', icon: <PersonIcon />, component: 'profile' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('users');
  const router = useRouter();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleMenuItemClick = (component: string) => {
    setSelectedComponent(component);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderContent = () => {
    switch (selectedComponent) {
      case 'users':
        return <UsersPage />;
      case 'posts':
        return <PostsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <UsersPage />;
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedComponent === item.component}
              onClick={() => handleMenuItemClick(item.component)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            React.js Developer Test Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Paper elevation={1} sx={{ p: 2, height: 'calc(100vh - 120px)', overflow: 'auto' }}>
          {renderContent()}
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
