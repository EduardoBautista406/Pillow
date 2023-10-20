import * as React from 'react';
import { useState, Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserDetails from './UserDetails';
import HousingDetails from './HousingDetails';
import Review from './Review';
import { SupervisedUserCircle } from '@mui/icons-material';
import { addUserDataToDatabase } from './PostBackend';
import { getAddressImage } from './PostBackend';

const steps = ['User details', 'Housing details', 'Review your post'];

type UserDataType = {
    name: string;
    phoneNumber: string;
    email: string;
}

export default function CreatePost() {
    const [userData, setUserData] = useState({name: '', email: '', phoneNumber: ''});
    const [housingData, setHousingData] = useState({address1: '', address2: '', price: '', sqft: '', beds: '', baths: '', gender: '', review: ''});
    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState<UserDataType>({ name: '', email: '', phoneNumber: ''});
    const [housingErrors, setHousingErrors] = useState({address1: '', address2: '', price: '', sqft: '', beds: '', baths: '', gender: '', review: ''})

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <UserDetails data={userData} setData={setUserData} errors={errors} />;
            case 1:
                return <HousingDetails data={housingData} setData={setHousingData} errors={housingErrors} />;
            case 2:
                return <Review user={userData} housing={housingData}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const validations = [
        () => {
            let valid = true;
            let newErrors = { name: '', email: '', phoneNumber: '' };
    
            if (!userData.name) {
                newErrors.name = 'Name is required.';
                valid = false;
            }
            if (!userData.phoneNumber) {
                newErrors.phoneNumber = 'Phone is required.';
                valid = false;
            }
            if (!userData.email) {
                newErrors.email = 'Email is required.'
                valid = false;
            }
    
            setErrors(newErrors);
            return valid;
        },
        () => {
            let valid = true;
            let newErrors = { address1: '', address2: '', price: '', sqft: '', gender: '', beds: '', baths: '', review: ''};
            
            if (!housingData.address1) {
                newErrors.address1 = 'Address is required.';
                valid = false;
            }
            if (!housingData.price) {
                newErrors.price = 'Price is required.';
                valid = false;
            }
            if (!housingData.sqft) {
                newErrors.sqft = 'Sqft is required.';
                valid = false;
            }
            if (!housingData.beds) {
                newErrors.beds = 'Beds are required.';
                valid = false;
            }
            if (!housingData.baths) {
                newErrors.baths = 'Bathrooms are required.';
                valid = false;
            }
            if (!housingData.gender) {
                newErrors.gender = 'Gender is required';
                valid = false;
            }

            setHousingErrors(newErrors);
            return valid;
        }
    ];

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            let url = '';
            alert("insert cool uploading animation here");
            getAddressImage(housingData.address1)
            .then(imageUrl => {
                console.log(imageUrl); // You can use this URL in an <img> tag to display the image
                url = imageUrl;
                addUserDataToDatabase(userData, housingData, url);
                window.location.href = '/';
            })
            .catch(error => {
                console.error(error);
            });
        }
        else if (validations[activeStep]()) {
            setActiveStep(activeStep + 1);
        } else {
            console.log("fill out all the boxes!");
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Fragment>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Create Posting
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Fragment>
                            <Typography variant="h5" gutterBottom>
                                Posting successfully submitted
                            </Typography>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Create Post' : 'Next'}
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                </Paper>
            </Container>
        </Fragment>
    );
}