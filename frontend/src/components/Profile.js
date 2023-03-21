import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState({
    username: '',
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
          username: response.data.username,
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
          name="username"
          placeholder="Username"
          value={updateData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={updateData.email}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
