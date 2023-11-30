import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Account created successfully!");
        
        navigate("/"); 
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>
        <form onSubmit={signUp} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
            Sign Up
          </Button>
        </form>
      </Paper>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
};

export default SignUp;

