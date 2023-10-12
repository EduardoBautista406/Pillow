import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export default function DetailView() {
    return (
        <>
            <CardMedia
                component="div"
                sx={{
                    // 16:9
                    pt: '20%',
                }}
                image="https://source.unsplash.com/random?wallpapers"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    1611 E 115th St
                </Typography>
                <Typography>
                    2 beds, 2 bathrooms, Male
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" href="mailto:ttp12@case.edu">
                    Contact
                </Button>
            </CardActions>
        </>
    );
}