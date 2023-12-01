import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function Navbar() {
    return (
        <AppBar position="relative">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Button href="/album">
                    <Typography variant="h6" color="white" noWrap>
                        Pillow
                    </Typography>
                </Button>
                <Button href="/prf" color="inherit">
                    <Avatar alt="Profile" src="C:\Users\vpolk\Pillow\src\assets\png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png" />
                </Button>
                
            </Toolbar>
        </AppBar>
    );
}