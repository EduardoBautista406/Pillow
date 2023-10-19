import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UserDetails from './UserDetails';



const Review = ({user, housing}) => {
    const userArray = [
        { name: 'Name', detail: user.name },
        { name: 'Email', detail: user.email },
        { name: 'Phone', detail: user.phoneNumber },
    ];
    const housingArray = [
        { name: 'Address', detail: housing.address1 + ' ' + housing.address2 },
        { name: 'Price', detail: "$" + housing.price },
        { name: 'Area', detail: housing.sqft + " sqft" },
        { name: 'Beds', detail: housing.beds },
        { name: 'Bathrooms', detail: housing.baths },
        { name: 'Gender', detail: housing.gender },
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Posting summary
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        User details
                    </Typography>
                    <Grid container>
                        {userArray.map((userArray) => (
                            <React.Fragment key={userArray.detail}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{userArray.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{userArray.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
                <Grid item container direction="column" xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Housing details
                    </Typography>
                    <Grid container>
                        {housingArray.map((housingArray) => (
                            <React.Fragment key={housingArray.detail}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{housingArray.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{housingArray.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default Review;

