import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import { FormGroup, TextField, Button, Paper } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    status: 'User',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/register', formData);
      if (response){
        navigate('/login');
      }
    } catch (err) {
      alert('Registration failed!');
      console.log(err)
    }
  };

  return (
    <div className={styles.layout}>
      <img src='/register-image.jpg' className={styles.image}/>
      <Paper elevation={1} className={styles.form}>
        <h2 className={styles.centerSpaced}>Welcome to TripBuddy!</h2>
        <FormGroup>
          <TextField
            className={styles.input}
            name="firstName"
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField 
            id="lastName"
            className={styles.input}
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal" 
          />

          <TextField 
            id="email"
            className={styles.input}
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            margin="normal" 
          />


          <TextField 
            id="phone"
            className={styles.input}
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal" 
          />


          <TextField 
            id="username"
            className={styles.input}
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            margin="normal" 
          />

        <TextField 
            id="password"
            className={styles.input}
            name="password"
            label="Password"
            type='password'
            value={formData.password}
            onChange={handleChange}
            margin="normal" 
          />

      <span className={styles.centerSpaced}>
      <Button type="submit" variant="contained" color="success" size="large" onClick={handleSubmit}>Register</Button>
      </span>
        
        </FormGroup>
      </Paper>
    </div>
  );
};

export default Register;