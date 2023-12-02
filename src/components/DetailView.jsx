import * as React from 'react';
import { useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { getListingById } from './CreatePost/PostBackend';
import { useParams } from 'react-router-dom';

export default function DetailView() {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);

    const handleContactClick = () => {
        const emailSubject = `Regarding the listing at ${listing.address}`;
        const emailBody = `Hi,\n\nI'm interested in the listing at ${listing.address}. Could you please provide more information?\n\nThank you.`;

        const mailtoLink = `mailto:${listing.userEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Open default email client
        window.location.href = mailtoLink;
    };

    useEffect(() => {
        const fetchListingId = async () => {
            try {
              const listings = await getListingById(listingId);
              setListing(listings.data());
              console.log(listings.data());
            } catch (error) {
              console.error("Failed to fetch listings:", error);
            }
        }
        fetchListingId();
    }, [listingId]);
   
    if (!listing) return <Typography>Loading...</Typography>;
    else {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Detail Posting
                        </Typography>
                        <CardMedia
                            component="div"
                            sx={{
                                // 16:9
                                pt: '100%',
                            }}
                            image={listing.image ? listing.image : "https://source.unsplash.com/random"}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {listing.address}
                            </Typography>

                            <Typography fontWeight={'500'}>
                                {listing.bedrooms} beds, {listing.bathrooms} bathrooms, {listing.sqft} sqft
                            </Typography>
                            <Typography fontWeight={'500'}>
                                ${listing.price} per month
                            </Typography>
                            <Typography gutterBottom fontWeight={'light'}>
                                {listing.preferences}
                            </Typography>
                            <Typography>
                                {listing.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" href='profile'>
                                Contact
                            </Button>
                        </CardActions>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography fontWeight={'light'}>
                                    {listing.date.toDate().toString()}
                            </Typography>
                            <Typography fontWeight={'light'}>
                                    {listing.user}
                            </Typography>
                        </CardContent>
                        
                    </Paper>
                </Container>
            </React.Fragment>

        );
    }
}