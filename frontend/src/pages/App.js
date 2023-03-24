import '../styles/App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Post from './Post';
import Profile from '../components/Profile';
import Browse from './Browse';
import Payment from '../components/Payment';
import Subscription from '../components/Subscription';
import NavigationBar from '../components/NavigationBar';
import Sample from './Sample';
import MyPosts from './MyPosts'
import NewPost from './NewPost';
import EditPost from './EditPost';
import SavedPosts from './SavedPosts'

const App = () => {
  return (
    <>
      <NavigationBar />

       <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/new-post" element={<NewPost /> } />
        <Route path="/profile" Component={Profile} />
        <Route path="/browse" element={<Browse /> } />
        <Route path="/payment" Component={Payment} />
        <Route path="/subscription" Component={Subscription} />
        <Route path="/sample" element={<Sample /> } />
        <Route path="/my-posts" element={<MyPosts /> } />
        <Route path="/my-posts/:postId" element={<Post mainUrl="/my-posts"/> } />
        <Route path="/browse/:postId" element={<Post mainUrl="/browse"/> } />
        <Route path="/my-posts/edit/:postId" element={<EditPost /> } />
        <Route path="/saved" element={<SavedPosts /> } />
        <Route path="/saved/:postId" element={<Post mainUrl="/saved"/>  } />
       </Routes>
    </>
  );
}

export default App;
