import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState({
    cardNumber: '',
    expirationDate: '',
    CVC: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    postalCode: '',
    BOD: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('/api/auth/payment', config);
        setUserData(response.data);
        setUpdateData({
            cardNumber: response.data.cardNumber,
            expirationDate: response.data.expirationDate,
            CVC: response.data.CVC,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
            address: response.data.address,
            country: response.data.country,
            city: response.data.city,
            postalCode: response.data.postalCode,
            BOD: response.data.BOD,
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
      await axios.put('/api/auth/payment', updateData, config);
      alert('Payment Info updated successfully');
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Payment Info</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Debit/Credit Card Number"
          value={updateData.cardNumber}
          onChange={handleChange}
        />
        <input
          type="month"
          name="expirationDate"
          placeholder="MM/YY"
          value={updateData.expirationDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="CVC"
          placeholder="CVC"
          value={updateData.CVC}
          onChange={handleChange}
        />
        <br />
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
          name="phone"
          placeholder="Phone"
          value={updateData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={updateData.address}
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
          type="date"
          name="BOD"
          placeholder="YYYY/MM/DD"
          value={updateData.BOD}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Payment;
