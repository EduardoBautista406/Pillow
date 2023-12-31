import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const UserDetails = ({ data, setData, errors }) => {
    const handleNameChange = (e) => {
        setData(prevData => ({
            ...prevData,
            name: e.target.value
        }));
    }
    const handleEmailChange = (e) => {
        setData(prevData => ({
            ...prevData,
            email: e.target.value
        }));
    };
    
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                User Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="Name"
                        name="Name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        value={data.name || ''}
                        onChange={handleNameChange}
                        error={errors.name}
                    />
                    {errors.name && <Typography color="error">{errors.name}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        variant="standard"
                        value={data.email || ''}
                        onChange={handleEmailChange}
                        error={errors.email}
                    />
                    {errors.email && <Typography color="error">{errors.email}</Typography>}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default UserDetails;