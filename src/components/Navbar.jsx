import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function Navbar() {
    const navigate = useNavigate();

    const handleAlbumClick = () => {
        
        if (auth.currentUser) {
            navigate('/album');
        } else {
            navigate('/')
        }
    };

    return (
        <AppBar position="relative">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Button onClick={handleAlbumClick}>
                    <Typography variant="h6" color="white" noWrap>
                        Pillow
                    </Typography>
                </Button>
                <Button href="/prf" color="inherit">
                    <Avatar alt="Profile">
                        <PermIdentityIcon />
                    </Avatar>
                </Button>
            </Toolbar>
        </AppBar>
    );
}
