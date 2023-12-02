import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getListingDataFromDatabase, sortByDate } from './CreatePost/PostBackend';



const defaultTheme = createTheme();

export default function Album() {
  const [listingList, setListingList] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const listings = await getListingDataFromDatabase();
      setListingList(sortByDate(listings));
      console.log(listings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href='create'>Create Post</Button>
              <Button variant="outlined">Sort by</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          
          <Grid container spacing={4}>
            {listingList.map((listingList) => (
              <Grid item key={listingList.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      
                      pt: '56.25%',
                    }}
                    image={listingList.image ? listingList.image : "https://source.unsplash.com/random"}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2"
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }} >
                      {listingList.address}
                    </Typography>
                    <Typography fontWeight={'light'} >
                      {listingList.bedrooms} beds, {listingList.bathrooms} bathrooms
                    </Typography>
                    <Typography fontWeight={'light'}>
                      {listingList.preferences}
                    </Typography>
                    <Typography fontWeight={'500'}>
                      ${listingList.price} / month
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={`/detail/${listingList.id}`}>View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}