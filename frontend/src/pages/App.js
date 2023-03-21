import '../styles/App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Post from './Post';
import Profile from '../components/Profile';
import Browse from './Browse';
import Payment from '../components/Payment';
import Subscription from '../components/Subscription';
import NavigationBar from '../components/NavigationBar';
import Sample from './Sample';

const App = () => {
  
  return (
    <>
      <NavigationBar />

        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home /> } />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/profile" Component={Profile} />
            <Route path="/post" element={<Post /> } />
            <Route path="/browse" element={<Browse /> } />
            <Route path="/payment" Component={Payment} />
            <Route path="/subscription" Component={Subscription} />
            <Route path="/sample" element={<Sample /> } />
          </Routes>
    </>
  );
}

export default App;
