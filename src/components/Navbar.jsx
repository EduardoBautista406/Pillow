import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function Navbar() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Button href="/">
                    <Typography variant="h6" color="white" noWrap>
                        Pillow
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
}