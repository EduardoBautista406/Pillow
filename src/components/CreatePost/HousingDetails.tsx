import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AutocompleteTextField from './AutocompleteTextField';


const HousingDetails = ({ data, setData, errors }) => {

    const handleAddress1Change = (e) => {
        setData(prevData => ({
            ...prevData,
            address1: e.target.value
        }));
    };
    const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
        setData(prevData => ({
            ...prevData,
            address1: place.formatted_address
        }));
    }
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
        setData(prevData => ({
            ...prevData,
            gender: e.target.value as string
        }));
    };
    const handleReviewChange = (e) => {
        setData(prevData => ({
            ...prevData,
            review: e.target.value
        }));
    };

    const allGenders = [
        "Abinary",
        "Agender",
        "Ambigender",
        "Androgyne",
        "Androgynos",
        "Androgynous",
        "Aporagender",
        "Autigender",
        "Bakla",
        "Bigender",
        "Binary",
        "Bissu",
        "Butch",
        "Calabai",
        "Calalai",
        "Cis",
        "Cisgender",
        "Cis female",
        "Cis male",
        "Demi-boy",
        "Demiflux",
        "Demigender",
        "Demi-girl",
        "Demi-guy",
        "Demi-man",
        "Dual gender",
        "Demi-woman",
        "Endosex",
        "Eunuch",
        "Fa'afafine",
        "Female",
        "Female to Male",
        "Femme",
        "FTM",
        "Gender bender",
        "Gender diverse",
        "Gender gifted",
        "Genderfluid",
        "Genderflux",
        "Genderfuck",
        "Genderless",
        "Gendervague",
        "Gender nonconforming",
        "Genderqueer",
        "Gender questioning",
        "Gender variant",
        "Graygender",
        "Heterosexual",
        "Hijra",
        "Intergender",
        "Intersex",
        "Kathoey",
        "Male",
        "Male to female",
        "Man of trans experience",
        "Maverique",
        "MTF",
        "Multigender",
        "Muxe",
        "Neurogender",
        "Neutrois",
        "Non-binary",
        "Non-binary transgender",
        "Omnigender",
        "Other",
        "Pangender",
        "Polygender",
        "Person of transgendered experience",
        "Queer",
        "Sekhet",
        "Straight",
        "Third gender",
        "Trans",
        "Trans female",
        "Trans male",
        "Trans man",
        "Trans person",
        "Trans woman",
        "Transgender",
        "Transgender female",
        "Transgender male",
        "Transgender man",
        "Transgender person",
        "Transgender woman",
        "Transfeminine",
        "Transmasculine",
        "Transsexual",
        "Transsexual female",
        "Transsexual male",
        "Transsexual man",
        "Transsexual person",
        "Transsexual woman",
        "Travesti",
        "Trigender",
        "Tumtum",
        "Two-spirit",
        "Vakasalewalewa",
        "Waria",
        "Winkte",
        "Woman of trans experience",
        "X-gender",
        "Xenogender"
    ];

    const existingGenders = [
        "Man",
        "Woman",
    ];

    const newGenders = allGenders.filter(gender => !existingGenders.includes(gender));
    const oldGenderOptions = existingGenders.map(gender => (
        <MenuItem value={gender}>{gender}</MenuItem>
    ));
    const newGenderOptions = newGenders.map(gender => (
        <MenuItem value={gender}>{gender}</MenuItem>
    ));

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Posting details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AutocompleteTextField
                        id="address1"
                        name="address1"
                        label="Address line 1 *"
                        fullWidth
                        variant="standard"
                        onChange={handleAddress1Change}
                        onPlaceSelected={handlePlaceSelected}
                        value={data.address1 || ''}
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
                        type="number"
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
                        type="number"
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
                            {oldGenderOptions}
                            {newGenderOptions}
                        </Select>
                        {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        label="Description"
                        fullWidth
                        multiline
                        variant="standard"
                        value={data.review || ''}
                        onChange={handleReviewChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default HousingDetails;