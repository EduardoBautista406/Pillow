import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";
import Avatar from "@mui/material/Avatar";
import PersonIcon from '@mui/icons-material/Person';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';


function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const userData = {
    fullName: user.displayName || 'John Doe',
    email: user.email || 'john@example.com',
  };

  const userListings = [
    { id: 1, title: 'Listing 1', image: 'https://source.unsplash.com/random?wallpapers' },
    { id: 2, title: 'Listing 2', image: 'https://source.unsplash.com/random?wallpapers' },
    { id: 3, title: 'Listing 3', image: 'https://source.unsplash.com/random?wallpapers' },
  ];

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            alt="User Profile Picture"
            src={userData.profilePicture}
            sx={{ width: 100, height: 100, marginBottom: '20px' }}
          >
            <PermIdentityIcon sx={{ width: 50, height: 50, marginBottom: '0px' }}  />
          </Avatar>
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
      <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
}

export default Profile;
