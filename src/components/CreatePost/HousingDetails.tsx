import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    const handleBedroomChange = (e) => {
        setData(prevData => ({
            ...prevData,
            beds: e.target.value
        }));
    };
    const handleBathroomChange = (e) => {
        setData(prevData => ({
            ...prevData,
            baths: e.target.value
        }));
    };
    const handleGenderChange = (e) => {
        setData(prevData => ({ ...prevData, gender: e.target.value as string }));
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item xs={4}>
                <FormControl variant="standard" required fullWidth>
                        <InputLabel id="beds">Beds</InputLabel>
                            <Select
                                labelId="beds"
                                id="beds"
                                value={data.beds || ''}
                                onChange={handleBedroomChange}
                                label="Beds"
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                            </Select>
                            {errors.beds && <Typography color="error">{errors.beds}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl variant="standard" required fullWidth>
                        <InputLabel id="baths">Baths</InputLabel>
                            <Select
                                labelId="baths"
                                id="baths"
                                value={data.baths || ''}
                                onChange={handleBathroomChange}
                                label="Baths"
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                            </Select>
                            {errors.baths && <Typography color="error">{errors.baths}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl variant="standard" required fullWidth>
                        <InputLabel id="gender">Gender</InputLabel>
                            <Select
                            labelId="gender"
                            id="gender"
                            value={data.gender || ''}
                            onChange={handleGenderChange}
                            label="Gender"
                            >
                                <MenuItem value="Man">Man</MenuItem>
                                <MenuItem value="Woman">Woman</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                                <MenuItem value="Agender">Agender</MenuItem>
                                <MenuItem value="Androgynous">Androgynous</MenuItem>
                                <MenuItem value="Bigender">Bigender</MenuItem>
                                <MenuItem value="Non-binary">Non-binary</MenuItem>
                                <MenuItem value="Fluid">Gender Fluid</MenuItem>
                                <MenuItem value="Questioning">Gender Questioning</MenuItem>
                                <MenuItem value="Intersex">Intersex</MenuItem>
                                <MenuItem value="Two-spirit">Two-spirit</MenuItem>
                                <MenuItem value="Cis">Cis</MenuItem>
                                <MenuItem value="Cisgender">Cisgender</MenuItem>
                                <MenuItem value="Cis Female">Cis Female</MenuItem>
                                <MenuItem value="Cis Male">Cis Male</MenuItem>
                                <MenuItem value="Cisgender Female">Cisgender Female</MenuItem>
                                <MenuItem value="Cisgender Male">Cisgender Male</MenuItem>
                                <MenuItem value="Female to Male">Female to Male</MenuItem>
                                <MenuItem value="FTM">FTM</MenuItem>
                                <MenuItem value="Gender Nonconforming">Gender Nonconforming</MenuItem>
                                <MenuItem value="Gender Variant">Gender Variant</MenuItem>
                                <MenuItem value="Genderqueer">Genderqueer</MenuItem>
                                <MenuItem value="Male to Female">Male to Female</MenuItem>
                                <MenuItem value="MTF">MTF</MenuItem>
                                <MenuItem value="Neither">Neither</MenuItem>
                                <MenuItem value="Neutrois">Neutrois</MenuItem>
                                <MenuItem value="Pangender">Pangender</MenuItem>
                                <MenuItem value="Trans Person">Trans Person</MenuItem>
                                <MenuItem value="Trans* Person">Trans* Person</MenuItem>
                                <MenuItem value="Trans Woman">Trans Woman</MenuItem>
                                <MenuItem value="Trans* Woman">Trans* Woman</MenuItem>
                                <MenuItem value="Transfeminine">Transfeminine</MenuItem>
                                <MenuItem value="Transgender">Transgender</MenuItem>
                                <MenuItem value="Transgender Female">Transgender Female</MenuItem>
                                <MenuItem value="Transgender Male">Transgender Male</MenuItem>
                                <MenuItem value="Transgender Man">Transgender Man</MenuItem>
                                <MenuItem value="Transgender Person">Transgender Person</MenuItem>
                                <MenuItem value="Transgender Woman">Transgender Woman</MenuItem>
                                <MenuItem value="Transmasculine">Transmasculine</MenuItem>
                                <MenuItem value="Transsexual">Transsexual</MenuItem>
                                <MenuItem value="Transsexual Female">Transsexual Female</MenuItem>
                                <MenuItem value="Transsexual Male">Transsexual Male</MenuItem>
                                <MenuItem value="Transsexual Man">Transsexual Man</MenuItem>
                                <MenuItem value="Transsexual Person">Transsexual Person</MenuItem>
                                <MenuItem value="Transsexual Woman">Transsexual Woman</MenuItem>
                            </Select>
                            {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default HousingDetails;