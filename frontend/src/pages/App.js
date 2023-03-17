import '../styles/App.css';
import React, {useState, useContext}  from "react";
import { Routes, Route} from "react-router-dom";
import Home from './Home';
import NavigationBar from '../components/NavigationBar';
import Sample from './Sample';
import MyPosts from './MyPosts'

const App = () => {
  return (
    <>
      <NavigationBar />

       <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/sample" element={<Sample /> } />
        <Route path="/myposts" element={<MyPosts /> } />
       </Routes>
    </>
  );
}

export default App;
