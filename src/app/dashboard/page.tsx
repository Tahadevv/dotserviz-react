'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { People as PeopleIcon, Article as ArticleIcon, Person as PersonIcon } from '@mui/icons-material';

const Dashboard = () => {
  const router = useRouter();

  const quickActions = [
    {
      title: 'Users',
      description: 'View and manage users',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/dashboard/users',
    },
    {
      title: 'Posts',
      description: 'Browse and search posts',
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      path: '/dashboard/posts',
    },
    {
      title: 'Profile',
      description: 'View and edit your profile',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      path: '/dashboard/profile',
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to React.js Developer Test Dashboard
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Manage your data and explore the features below.
          </Typography>

          <Grid container spacing={3}>
            {quickActions.map((action) => (
              <Grid item xs={12} sm={6} md={4} key={action.title}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                  onClick={() => router.push(action.path)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {action.icon}
                    </Box>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
