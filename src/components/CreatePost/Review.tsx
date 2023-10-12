import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const user = [
    { name: 'Name', detail: 'Jo Phan' },
    { name: 'Email', detail: 'jojo@memail.com' },
    { name: 'Phone', detail: '123456789' },
];
const housing = [
    { name: 'Address', detail: '105 115 St Cleveland, OH' },
    { name: 'Price', detail: '$1300/month' },
    { name: 'Sqft', detail: '500' },
    { name: 'Gender', detail: 'M' },
];

export default function Review() {
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
                        {user.map((user) => (
                            <React.Fragment>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{user.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{user.detail}</Typography>
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
                        {housing.map((housing) => (
                            <React.Fragment key={user[1].detail}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{housing.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{housing.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

