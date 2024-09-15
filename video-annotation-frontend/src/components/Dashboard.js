// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');




  useEffect(() => {
    
    const accessToken = localStorage.getItem('accessToken');

    // Fetch the user's videos
    axios.get('http://localhost:8000/api/videos/user/videos/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      setVideos(response.data);
    })
    .catch((error) => {
      setMessage('Failed to load your videos.');
      console.error('Error fetching user videos:', error);
    });
  }, []);

  return (
    <div className="container my-4">
      <h2>Your Uploaded Videos</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      {videos.length > 0 ? (
        <ul className="list-group">
          {videos.map((video) => (
            <li key={video.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{video.title}</span>
              <Link to={`/player/${video.id}`} className="btn btn-primary btn-sm">View</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos uploaded yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
