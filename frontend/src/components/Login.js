import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { useAuth } from '../context/authContext';
import { FormGroup, TextField, Button, Paper } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const {saveToken} = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', formData);
      if (response.data.token){
        saveToken(response.data.token);
        navigate('/home');
      } else {
        alert('Authentication failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 403) {
        alert('Your account has been restricted');
      } else {
        alert('Error logging in');
      }
    }
  };

  return (
    <div className={styles.layout}>
      <img src='/login-image.jpg' className={styles.image}/>
      <Paper elevation={1} className={styles.form}>
        <h2 className={styles.centerSpaced}>Login</h2>
        <FormGroup>
          <TextField
            className={styles.input}
            name="username"
            value={formData.username}
            onChange={handleChange}
            id="username"
            label="Username"
            margin="normal" 
          />

          <TextField 
            className={styles.input}
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            margin="normal" 
          />

        <span className={styles.centerSpaced}>
          <Button type="submit" variant="contained" color="success" size="large" onClick={handleSubmit}>Login</Button>
        </span>

          <p id="create" className="text-center text-muted small">
            Don't have an account?&nbsp;
            <a className="link" href="/register">Register Here!</a>
          </p>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default Login;