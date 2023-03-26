import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import  ConfirmationPopup from '../components/ConfirmationPopup';
import { useAuth } from '../context/authContext';

const Profile = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false)
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    postalCode: '',
    BOD: '',
    sex: '',
    email: '',
  });
  
  const {token} = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('/api/profile', config);
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put('/api/profile', userData, config);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h1>Profile</h1>
      <div className={styles.wrap}>
        <input
          className={styles.firstName}
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
          <input
          className={styles.lastName}
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
        </div>
        <br />
        <div className={styles.wrap}>
        <input
          className={styles.address}
          type="text"
          name="address"
          placeholder="Address"
          value={userData.address}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
          <input
          className={styles.phone}
          type="text"
          name="phone"
          placeholder="Phone"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
        </div>
        <br />
        <div className={styles.wrap}>
        <input
          className={styles.country}
          type="text"
          name="country"
          placeholder="Country"
          value={userData.country}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
          <input
          className={styles.city}
          type="text"
          name="city"
          placeholder="City"
          value={userData.city}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
        </div>
        <br />
        <div className={styles.wrap}>
        <input
          className={styles.postalCode}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={userData.postalCode}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
          <input
          className={styles.BOD}
          type="Date"
          name="BOD"
          placeholder="YYYY/MM/DD"
          value={userData.BOD}
          onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
        />
        </div>
        <br />
        <div className={styles.wrap}>
          <div className={styles.sex}>
            <label>Sex &nbsp;</label>
            <select
              name="sex"
              value={userData.sex}
              onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}>
                <option value="" disabled hidden >Select&nbsp;</option>
                <option value="Male">Male&nbsp;</option>
                <option value="Female">Female&nbsp;</option>
                <option value="Other">Hide&nbsp;</option>
          </select>
          </div>
          <input
            className={styles.email}
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
          />
        </div>
        <br />
        <button className={styles.button} type="submit" onClick={() => setShowPopup(true)}>Save</button>
        <ConfirmationPopup doAction={() => navigate('/home')} title={"Confirmation Action Require "} message={"Are you sure you want to update this user information ?"} show={showPopup} setShow={setShowPopup}/>
      </form>
    </div>
  );
};

export default Profile;
