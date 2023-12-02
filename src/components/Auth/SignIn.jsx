
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Account created successfully!");
        navigate("/album"); 
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Avatar sx={{ width: 100, height: 100, marginBottom: "10px" }} />
        </div>
        <Typography variant="h5" align="center" gutterBottom>
            Log In to your Account
        </Typography>
        <form onSubmit={signIn} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            Log In
            </Button>
            <Typography variant="body2" style={{ marginTop: "10px" }}>
            Don't have an account?{" "}
            <Button variant="text" href="New User" color="primary" style={{ marginLeft: "5px" }}>
                Create Account
            </Button>
            </Typography>
        </form>
        </Paper>
        <ToastContainer position="bottom-right" autoClose={5000} />
    </>
    
    
  );
};

export default SignIn;




