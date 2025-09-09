'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch user profile from API (using user ID 2 as specified)
        const response = await fetch('https://reqres.in/api/users/2', {
          headers: {
            'x-api-key': 'reqres-free-v1',
          },
        });
        const data = await response.json();
        
        if (response.ok && data.data) {
          setProfile(data.data);
          setFormData({
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            email: data.data.email,
          });
        } else {
          setError('Failed to fetch profile');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    if (profile) {
      setFormData({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the profile
    // For now, we'll just update the local state
    if (profile) {
      setProfile({
        ...profile,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      });
    }
    setEditing(false);
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

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
        Profile
      </Typography>
      
      <Card elevation={3}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={profile?.avatar}
              alt={`${profile?.first_name} ${profile?.last_name}`}
              sx={{ width: 80, height: 80, mr: 3 }}
            />
            <Box>
              <Typography variant="h5" component="h2">
                {profile?.first_name} {profile?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User ID: {profile?.id}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.first_name}
                onChange={handleInputChange('first_name')}
                disabled={!editing}
                variant={editing ? 'outlined' : 'filled'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.last_name}
                onChange={handleInputChange('last_name')}
                disabled={!editing}
                variant={editing ? 'outlined' : 'filled'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={handleInputChange('email')}
                disabled={!editing}
                variant={editing ? 'outlined' : 'filled'}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {editing ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
          </Box>

          {editing && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Note: Changes are not persisted to the server in this demo.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
