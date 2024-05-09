import React, { useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Context, server } from './main';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import WT from './pages/WT';
import Login from './pages/Login';
import Channel from './pages/Channel';
import AudioRoom from './pages/Audioroom';




function App() {
  const { setUser, setAuth, setLoader } = useContext(Context);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setAuth(true);
        setLoader(false);
      })
      .catch((error) => {
        setUser({});
        setAuth(false);
        setLoader(false);
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wt" element={<WT />} />
        <Route path="/room/:id" element={<Channel />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

const Home = () => {
  return <h1>Home Page</h1>;
};

const Profile = () => {
  return <h1>Profile Page</h1>;
};

export default App;
