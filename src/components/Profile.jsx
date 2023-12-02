import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import Avatar from '@mui/material/Avatar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { doc, getDocs, collection, deleteDoc } from 'firebase/firestore'; 
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      
      if (currentUser) {
        fetchUserPosts(currentUser.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const handleDelete = async (postId) => {
    try {
      
      await deleteDoc(doc(db, 'listings', postId));

      
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const fetchUserPosts = async (userEmail) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'listings'));
      const posts = [];

      querySnapshot.forEach((doc) => {
        const listingUserEmail = doc.data().user; 
        if (listingUserEmail === userEmail) {
          posts.push({ id: doc.id, ...doc.data() });
        }
      });

      setUserPosts(posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const userData = {
    fullName: user.displayName || 'John Doe',
    email: user.email || 'john@example.com',
  };

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
            <PermIdentityIcon sx={{ width: 50, height: 50, marginBottom: '0px' }} />
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
        {userPosts.map((post) => (
          <Paper key={post.id} elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
            <CardMedia component="img" alt={`Post ${post.id}`} height="150" image={post.image} />
            <Typography variant="subtitle1">{post.title}</Typography>
            <CardActions style={{ justifyContent: 'space-between' }}>
              <Button href={`/detail/${post.id}`} size="small" variant="outlined" color="primary">
                View Post
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(post.id)}>
                Delete
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
