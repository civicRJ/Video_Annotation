// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoUpload from './components/VideoUpload';
import VideoPlayer from './components/VideoPlayer';
import SearchVideos from './components/SearchVideos';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';  // Import Navbar
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <div className="App">
        <Routes>
        <Route path="/" element={<SearchVideos />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/player/:id" element={<VideoPlayer />} />
          <Route path="/search" element={<SearchVideos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
