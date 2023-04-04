import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Subscription.module.css';

const Subscription = () => {
    const navigate = useNavigate();
    const [currentSubscription, setCurrentSubscription] = useState({
      subscription: '',
    });
    const [selectedSubscription, setSelectedSubscription] = useState({
      subscription: '',
    });

    useEffect(() => {
    const fetchSubscription = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get('/api/subscription', config);
            setCurrentSubscription({
              subscription: response.data.subscription,
            });
            setSelectedSubscription({
                subscription: response.data.subscription,
              });
        } catch (err) {
            console.error(err);
        }
        };
        fetchSubscription();
    }, []);

    const handlePlanChange = (e) => {
        setSelectedSubscription({ ...selectedSubscription, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            await axios.put('/api/subscription', selectedSubscription, config);
            alert('Subscribe successfully');
            navigate('/home');
          } catch (err) {
            console.error(err);
          }
      };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h3>Current Plan: {currentSubscription.subscription}</h3>
      <h1>Select a subscription plan:</h1>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="subscription"
          value='Basic'
          onChange={handlePlanChange}
        />
        <label htmlFor="basic">&nbsp;Basic Plan</label>
      </div>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="subscription"
          value='Premium'
          onChange={handlePlanChange}
        />
        <label htmlFor="premium">&nbsp;Premium Plan</label>
      </div>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="subscription"
          value='Business'
          onChange={handlePlanChange}
        />
        <label htmlFor="business">&nbsp;Business Plan</label>
      </div>
      <button className={styles.button} type="submit">Subscribe</button>

      </form>
    </div>
  );
};

export default Subscription;
