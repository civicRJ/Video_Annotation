// src/components/SearchVideos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchVideos = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all videos when the page loads
    axios.get('http://localhost:8000/api/videos/')
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        setMessage('Failed to load videos.');
        console.error('Error fetching videos:', error);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query) {
      setMessage('Please enter a tag to search.');
      return;
    }

    setMessage('');
    setResults([]);

    // Search for videos by annotation tag
    axios.get(`http://localhost:8000/api/videos/search/?tag=${query}`)
      .then((response) => {
        if (response.data.length === 0) {
          setMessage('No videos found with that annotation.');
        } else {
          setResults(response.data);
        }
      })
      .catch((error) => {
        setMessage('An error occurred while searching.');
      });
  };

  return (
    <div className="container my-4">
      <h2>Search Videos by Annotations</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label htmlFor="searchTag" className="form-label">Tag to Search:</label>
          <input
            type="text"
            className="form-control"
            id="searchTag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter tag (e.g., Car, Tree)"
          />
        </div>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary w-100">Search</button>
        </div>
      </form>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {results.length > 0 && (
        <div className="mt-4">
          <h3>Videos</h3>
          <ul className="list-group">
            {results.map((video) => (
              <li key={video.id} className="list-group-item">
                <strong>{video.title}</strong>
                <div className="text-end">
                  <Link to={`/player/${video.id}`} className="btn btn-outline-primary btn-sm">
                    View Video
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchVideos;
