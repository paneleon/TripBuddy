import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
    const navigate = useNavigate();
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

    useEffect(() => {
    const fetchSubscription = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.get('/api/auth/subscription', config);
            setCurrentSubscription(res.data.subscription);
            setSelectedSubscription({
                subscription: res.data.subscription,
              });
        } catch (err) {
            console.error(err);
        }
        };
        fetchSubscription();
    }, []);

    const updateSubscription = async () => {
        try {
          const res = await axios.put('/api/auth/subscription');
          setCurrentSubscription(res.data.subscription); 
          setSelectedSubscription({
            subscription: selectedSubscription,
          });
        } catch (err) {
          console.error(err);
        }
      };

    const handlePlanChange = (e) => {
        e.preventDefault();
        setSelectedSubscription({ ...selectedSubscription, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            await axios.put('/api/auth/subscription', selectedSubscription, config);

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
          value="Basic"
          checked={selectedSubscription === 'Basic'}
          onChange={handlePlanChange}
        />
        <label htmlFor="basic">Basic Plan</label>
      </div>
      <div>
        <input
          type="radio"
          name="subscription"
          value="Premium"
          checked={selectedSubscription === 'Premium'}
          onChange={handlePlanChange}
        />
        <label htmlFor="premium">Premium Plan</label>
      </div>
      <div>
        <input
          type="radio"
          name="subscription"
          value="Business"
          checked={selectedSubscription === 'Business'}
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
