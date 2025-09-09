'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        
        if (response.ok) {
          // Display only first 20 posts
          const first20Posts = data.slice(0, 20);
          setPosts(first20Posts);
          setFilteredPosts(first20Posts);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  if (loading) {
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
        Posts
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredPosts.length} of {posts.length} posts
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredPosts.map((post) => (
          <Card key={post.id} elevation={2}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Post ID: {post.id} | User ID: {post.userId}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {post.body}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredPosts.length === 0 && searchTerm && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No posts found matching "{searchTerm}"
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PostsPage;
