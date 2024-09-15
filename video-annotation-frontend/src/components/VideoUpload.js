// src/components/VideoUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [videoId, setVideoId] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a video file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video_file', selectedFile);  // Ensure the key is 'video_file'
    formData.append('title', selectedFile.name);   // Optional: Add video title

    // Make the API call
    axios.post('http://localhost:8000/api/videos/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,  // Send the access token
      },
    })
    .then((response) => {
      setMessage('File uploaded successfully!');
      setVideoId(response.data.id);  // Store the video ID
    })
    .catch((error) => {
      setMessage(error.response?.data.error || 'File upload failed.');
    });
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 text-center">
          <h2>Upload Video</h2>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Select Video File (MP4, AVI):</label>
              <input
                type="file"
                className="form-control"
                id="formFile"
                onChange={handleFileChange}
                accept="video/mp4,video/x-m4v,video/*"
                required
              />
            </div>

            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-success w-100">Upload</button>
            </div>
          </form>

          {message && (
            <div className="alert alert-info text-center">
              {message}
            </div>
          )}

          {videoId && (
            <div className="text-center mt-3">
              <a href={`/player/${videoId}`} className="btn btn-primary">
                Go to Video Player
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
