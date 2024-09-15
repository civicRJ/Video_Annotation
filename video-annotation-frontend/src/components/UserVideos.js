// src/components/UserVideos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserVideos = ({ authToken }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:8000/api/videos/user/videos/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user videos:', error);
      });
    }
  }, [authToken]);

  return (
    <div className="container my-4">
      <h2>Your Videos</h2>
      <ul className="list-group">
        {videos.map((video) => (
          <li key={video.id} className="list-group-item d-flex justify-content-between align-items-center">
            {video.title}
            <Link to={`/player/${video.id}`} className="btn btn-primary btn-sm">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserVideos;
