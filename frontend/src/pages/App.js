import '../styles/App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Post from './Post';
import Profile from './Profile';
import Browse from './Browse';
import Payment from './Payment';
import Subscription from './Subscription';
import NavigationBar from '../components/NavigationBar';
import Sample from './Sample';
import MyPosts from './MyPosts'
import NewPost from './NewPost';

const App = () => {
  return (
    <>
      <NavigationBar />

       <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register} />
        <Route path="/new-post" element={<NewPost /> } />
        <Route path="/profile" element={<Profile /> } />
        <Route path="/browse" element={<Browse /> } />
        <Route path="/payment" element={<Payment /> } />
        <Route path="/subscription" element={<Subscription /> } />
        <Route path="/sample" element={<Sample /> } />
        <Route path="/my-posts" element={<MyPosts /> } />
        <Route path="/my-posts/:postId" element={<Post /> } />
       </Routes>
    </>
  );
}

export default App;
