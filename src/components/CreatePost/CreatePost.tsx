import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import Typography from '@mui/material/Typography';
import UserDetails from './UserDetails';
import { useNavigate } from 'react-router-dom';
import HousingDetails from './HousingDetails';
import Review from './Review';
import { addUserDataToDatabase } from './PostBackend';
import { getAddressImage } from './PostBackend';
import { auth } from '../../firebase';

const steps = ['User details', 'Housing details', 'Review your post'];

type UserDataType = {
  name: string;
  email: string;
};

export default function CreatePost() {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [housingData, setHousingData] = useState({
    address1: '',
    address2: '',
    price: '',
    sqft: '',
    beds: '',
    baths: '',
    gender: '',
    review: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<UserDataType>({ name: '', email: '' });
  const [housingErrors, setHousingErrors] = useState({
    address1: '',
    address2: '',
    price: '',
    sqft: '',
    beds: '',
    baths: '',
    gender: '',
    review: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, update the state with user data
        setUserData({ name: user.displayName || '', email: user.email || '' });
      } else {
        // User is signed out, reset the state
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <UserDetails data={userData} setData={setUserData} errors={errors} />;
      case 1:
        return <HousingDetails data={housingData} setData={setHousingData} errors={housingErrors} />;
      case 2:
        return <Review user={userData} housing={housingData} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const validations = [
    () => {
      let valid = true;
      let newErrors = { name: '', email: '' };

      if (!userData.name) {
        newErrors.name = 'Name is required.';
        valid = false;
      }
      if (!userData.email) {
        newErrors.email = 'Email is required.';
        valid = false;
      }

      setErrors(newErrors);
      return valid;
    },
    () => {
      let valid = true;
      let newErrors = {
        address1: '',
        address2: '',
        price: '',
        sqft: '',
        gender: '',
        beds: '',
        baths: '',
        review: '',
      };

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
    },
  ];

  const navigate = useNavigate();
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      getAddressImage(housingData.address1)
        .then((imageUrl) => {
          console.log(imageUrl);
          addUserDataToDatabase(userData, housingData, imageUrl)
            .then(() => {
              toast.success("Listing created successfully!");
              navigate('/album');
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (validations[activeStep]()) {
      setActiveStep(activeStep + 1);
    } else {
      console.log('Fill out all the boxes!');
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
                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Create Post' : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
      </Container>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </Fragment>
  );
}
