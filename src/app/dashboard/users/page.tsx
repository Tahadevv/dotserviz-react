'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      });
      const data: UsersResponse = await response.json();
      
      if (response.ok) {
        setUsers(data.data);
        setTotalPages(data.total_pages);
        setCurrentPage(data.page);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading && users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      
      {isMobile ? (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} key={user.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                  </TableCell>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ alignSelf: 'center' }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ArrowForward />}
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UsersPage;
