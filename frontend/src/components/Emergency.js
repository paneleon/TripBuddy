import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Emergency.module.css';

const Emergency = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState({
    emergencyFirstName: '',
    emergencyLastName: '',
    emergencyPhone: '',
    emergencyEmail: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('/api/auth/emergency', config);
        setUserData(response.data);
        setUpdateData({
          emergencyFirstName: response.data.emergencyFirstName,
          emergencyLastName: response.data.emergencyLastName,
          emergencyPhone: response.data.emergencyPhone,
          emergencyEmail: response.data.emergencyEmail,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put('/api/auth/emergency', updateData, config);
      alert('Emergency Contact Updated Successfully');
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h1>Emergency Contact</h1>
      <div className={styles.wrap}>
        <input
          className={styles.emergencyFirstName}
          type="text"
          name="emergencyFirstName"
          placeholder="First Name"
          value={updateData.emergencyFirstName}
          onChange={handleChange}
          />
          <input
          className={styles.emergencyLastName}
          type="text"
          name="emergencyLastName"
          placeholder="Last Name"
          value={updateData.emergencyLastName}
          onChange={handleChange}
          />
        </div>
      <br />
        <div className={styles.wrap}>
          <input
          className={styles.emergencyPhone}
          type="text"
          name="emergencyPhone"
          placeholder="Phone"
          value={updateData.emergencyPhone}
          onChange={handleChange}
          />
          <input
          className={styles.emergencyEmail}
          type="email"
          name="emergencyEmail"
          placeholder="Email"
          value={updateData.emergencyEmail}
          onChange={handleChange}
          />
        </div>
       <br />
       <textarea
        className={styles.message}
        name="textarea"
        placeholder="Leave a message here"
       />
       <br />
        <button className={styles.button} type="submit">Save</button>
      </form>
    </div>
  );
};

export default Emergency;
