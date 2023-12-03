import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const allGenders = [
    "Abinary", "Agender", "Ambigender", "Androgyne", "Androgynos", "Androgynous", "Aporagender",
    "Autigender", "Bakla", "Bigender", "Binary", "Bissu", "Butch", "Calabai", "Calalai", "Cis",
    "Cisgender", "Cis female", "Cis male", "Demi-boy", "Demiflux", "Demigender", "Demi-girl",
    "Demi-guy", "Demi-man", "Dual gender", "Demi-woman", "Endosex", "Eunuch", "Fa'afafine",
    "Female", "Female to Male", "Femme", "FTM", "Gender bender", "Gender diverse", "Gender gifted",
    "Genderfluid", "Genderflux", "Genderfuck", "Genderless", "Gendervague", "Gender nonconforming",
    "Genderqueer", "Gender questioning", "Gender variant", "Graygender", "Heterosexual", "Hijra",
    "Intergender", "Intersex", "Kathoey", "Male", "Male to female", "Man of trans experience",
    "Maverique", "MTF", "Multigender", "Muxe", "Neurogender", "Neutrois", "Non-binary",
    "Non-binary transgender", "Omnigender", "Other", "Pangender", "Polygender",
    "Person of transgendered experience", "Queer", "Sekhet", "Straight", "Third gender", "Trans",
    "Trans female", "Trans male", "Trans man", "Trans person", "Trans woman", "Transgender",
    "Transgender female", "Transgender male", "Transgender man", "Transgender person",
    "Transgender woman", "Transfeminine", "Transmasculine", "Transsexual", "Transsexual female",
    "Transsexual male", "Transsexual man", "Transsexual person", "Transsexual woman", "Travesti",
    "Trigender", "Tumtum", "Two-spirit", "Vakasalewalewa", "Waria", "Winkte", "Woman of trans experience",
    "X-gender", "Xenogender"
  ];

  const allYears = ["Freshman", "Sophomore", "Junior", "Senior"];

  const signUp = async (e) => {
    e.preventDefault();

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      
      await updateProfile(userCredential.user, { displayName: name });

      
      const userDocRef = doc(db, 'User', userCredential.user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        gender,
        year,
        
      });

      toast.success('Account created successfully!');
      navigate('/album'); 
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>
        <form onSubmit={signUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            type="text"
            label="Enter your name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="email"
            label="Enter your email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Enter your password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputLabel htmlFor="gender" style={{ marginTop: '15px' }}>
            Select Gender
          </InputLabel>
          <Select
            id="gender"
            variant="outlined"
            margin="normal"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ width: '19%', marginTop: '5px'}}
          >
            {allGenders.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
          <InputLabel htmlFor="year" style={{ marginTop: '19px' }}>
            Select your year
          </InputLabel>
          <Select
            id="year"
            variant="outlined"
            margin="normal"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ width: '19%', marginTop: '5px'}}
          >
            {allYears.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Sign Up
          </Button>
        </form>
      </Paper>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
};

export default SignUp;
