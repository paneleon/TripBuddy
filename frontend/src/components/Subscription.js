import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
    const navigate = useNavigate();
    const [currentSubscription, setCurrentSubscription] = useState({});
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
            const response = await axios.get('/api/auth/subscription', config);
            setCurrentSubscription(response.data.subscription);
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
            await axios.put('/api/auth/subscription', selectedSubscription, config);
            alert('Subscribe successfully');
            navigate('/home');
          } catch (err) {
            console.error(err);
          }
      };

  return (
    <div>
      <h1>Select a subscription plan:</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <input
          type="radio"
          name="subscription"
          value='Basic'
          onChange={handlePlanChange}
        />
        <label htmlFor="basic">Basic Plan</label>
      </div>
      <div>
        <input
          type="radio"
          name="subscription"
          value='Premium'
          onChange={handlePlanChange}
        />
        <label htmlFor="premium">Premium Plan</label>
      </div>
      <div>
        <input
          type="radio"
          name="subscription"
          value='Business'
          onChange={handlePlanChange}
        />
        <label htmlFor="business">Business Plan</label>
      </div>
      <button type="submit">Subscribe</button>

      </form>
    </div>
  );
};

export default Subscription;
