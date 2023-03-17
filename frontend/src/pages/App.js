import '../styles/App.css';
import React, {useState, useContext}  from "react";
import { Routes, Route} from "react-router-dom";
import Home from './Home';
import NavigationBar from '../components/NavigationBar';
import Sample from './Sample';
import MyPosts from './MyPosts'
import Post from './Post';

const App = () => {
  return (
    <>
      <NavigationBar />

       <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/sample" element={<Sample /> } />
        <Route path="/myposts" element={<MyPosts /> } />
        <Route path="/myposts/:id" element={<Post /> } />
       </Routes>
    </>
  );
}

export default App;
