import '../styles/App.css';
import React, {useState, useContext}  from "react";
import { Routes, Route, Navigate, Link, Router } from "react-router-dom";
import Home from './Home';

const App = () => {
  return (
    <div className="App">
       <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home /> } />
       </Routes>
    </div>
  );
}

export default App;
