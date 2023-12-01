import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // If user is not logged in, render a loading state or redirect to login
  if (!user) {
    return <div>Loading...</div>;
  }

  // Use user data from authentication state
  const userData = {
    fullName: user.displayName || 'John Doe',
    email: user.email || 'john@example.com',
    profilePicture: user.photoURL || 'https://source.unsplash.com/random?people',
  };

  // Sample user listings (replace with actual user listings)
  const userListings = [
    { id: 1, title: 'Listing 1', image: 'https://source.unsplash.com/random?wallpapers' },
    { id: 2, title: 'Listing 2', image: 'https://source.unsplash.com/random?wallpapers' },
    { id: 3, title: 'Listing 3', image: 'https://source.unsplash.com/random?wallpapers' },
  ];

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            alt="User Profile Picture"
            src={userData.profilePicture}
            sx={{ width: 100, height: 100, marginBottom: '10px' }}
          />
        </div>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {userData.fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: {userData.email}
          </Typography>
        </CardContent>
      </Paper>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          User Listings
        </Typography>
        {userListings.map((listing) => (
          <Paper key={listing.id} elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
            <CardMedia component="img" alt={`Listing ${listing.id}`} height="150" image={listing.image} />
            <Typography variant="subtitle1">{listing.title}</Typography>
            <CardActions>
              <Button size="small" variant="outlined" color="primary">
                View Listing
              </Button>
            </CardActions>
          </Paper>
        ))}
      </div>
    </Container>
  );
}

export default Profile;
