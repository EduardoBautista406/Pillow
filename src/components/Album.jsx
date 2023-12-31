import * as React from 'react';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
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
import { getListingDataFromDatabase, getTimeAgo, sortByDate, sortByPriceAscending, sortByPriceDescending } from './CreatePost/PostBackend';
import AuthValidation from './Auth/AuthValidation';
import { HandymanOutlined } from '@mui/icons-material';



const defaultTheme = createTheme();

export default function Album() {
  const [sortType, setSortType] = useState(1);
  const [listingList, setListingList] = useState([]);
  
  AuthValidation();

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSortToggle = () => {
    if (sortType < 2) {
      setSortType(sortType + 1);
    } else {
      setSortType(0);
    }
    switch (sortType) {
      case 0:
        setListingList(sortByDate(listingList));
        break;
      case 1:
        setListingList(sortByPriceAscending(listingList));
        break;
      case 2:
        setListingList(sortByPriceDescending(listingList));
        break;
      default:
        break;
    }
    console.log(sortType);
  }

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
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            {/* <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography> */}
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href='create'>Create Post</Button>
              <Button variant="outlined" onClick={handleSortToggle}>{sortType === 1 ? 'Sort by Date' : sortType === 0 ? 'Sort Price Descending' : 'Sort by Price Ascending'}</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listingList.map((listingList) => (
              <Grid item key={listingList.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
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
                      {listingList.bedrooms} bd | {listingList.bathrooms} ba | {listingList.sqft} sqft
                    </Typography>
                    <Typography fontWeight={'light'}>
                      {listingList.preferences}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography fontWeight={'500'}>
                        ${listingList.price} / mo
                        </Typography>
                        
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: 'right'}}>
                        <Typography fontWeight={'light'} style={{ fontSize:'12px'}}>
                          {getTimeAgo(listingList.date)}
                        </Typography>
                      </Grid>
                    </Grid>
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
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box> */}
    </ThemeProvider>
  );
}