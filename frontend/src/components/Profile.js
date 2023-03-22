import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState({
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('/api/auth/profile', config);
        setUserData(response.data);
        setUpdateData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          address: response.data.address,
          phone: response.data.phone,
          country: response.data.country,
          city: response.data.city,
          postalCode: response.data.postalCode,
          BOD: response.data.BOD,
          sex: response.data.sex,
          email: response.data.email,
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
      await axios.put('/api/auth/profile', updateData, config);
      alert('Profile updated successfully');
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={updateData.firstName}
          onChange={handleChange}
        />
          <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={updateData.lastName}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={updateData.address}
          onChange={handleChange}
        />
          <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={updateData.phone}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={updateData.country}
          onChange={handleChange}
        />
          <input
          type="text"
          name="city"
          placeholder="City"
          value={updateData.city}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={updateData.postalCode}
          onChange={handleChange}
        />
          <input
          type="Date"
          name="BOD"
          placeholder="YYYY/MM/DD"
          value={updateData.BOD}
          onChange={handleChange}
        />
        <br />
        <input
          type="radio"
          name="sex"
          placeholder="Male"
          value={updateData.sex}
          onChange={handleChange}
        />
        <label>Male</label>
          <input
          type="radio"
          name="sex"
          placeholder="Female"
          value={updateData.sex}
          onChange={handleChange}
        />
        <label>Female</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={updateData.email}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;
