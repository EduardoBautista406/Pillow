import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function Navbar() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Button href="/album" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="src\assets\pillowLogo.png" alt="logo" style={{ width: 25, height: 25, marginRight: '4px' }} />
                    <Typography variant="h6" color="white" noWrap>
                        Pillow
                    </Typography>
                </Button>
                
            </Toolbar>
        </AppBar>
    );
}