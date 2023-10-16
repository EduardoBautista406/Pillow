import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const HousingDetails = ({ data, setData, errors }) => {

    const handleAddress1Change = (e) => {
        setData(prevData => ({
            ...prevData,
            address1: e.target.value
        }));
    };
    const handleAddress2Change = (e) => {
        setData(prevData => ({
            ...prevData,
            address2: e.target.value
        }));
    };
    const handlePriceChange = (e) => {
        setData(prevData => ({
            ...prevData,
            price: e.target.value
        }));
    };
    const handleSqftChange = (e) => {
        setData(prevData => ({
            ...prevData,
            sqft: e.target.value
        }));
    };
    const handleGenderChange = (e) => {
        setData(prevData => ({
            ...prevData,
            gender: e.target.value
            }));
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Posting details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="address-line1"
                        variant="standard"
                        value={data.address1 || ''}
                        onChange={handleAddress1Change}
                        error={errors.address1}
                    />
                    {errors.address1 && <Typography color="error">{errors.address1}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="address-line2"
                        variant="standard"
                        value={data.address2 || ''}
                        onChange={handleAddress2Change}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="price"
                        label="Price"
                        fullWidth
                        variant="standard"
                        value={data.price || ''}
                        onChange={handlePriceChange}
                        error={errors.price}
                    />
                    {errors.price && <Typography color="error">{errors.price}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="sqft"
                        label="Sqft"
                        fullWidth
                        variant="standard"
                        value={data.sqft || ''}
                        onChange={handleSqftChange}
                        error={errors.sqft}
                    />
                    {errors.sqft && <Typography color="error">{errors.sqft}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="gender"
                        label="Gender"
                        fullWidth
                        variant="standard"
                        value={data.gender || ''}
                        onChange={handleGenderChange}
                        error={errors.gender}
                    />
                    {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default HousingDetails;