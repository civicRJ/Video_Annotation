// src/components/VideoPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './VideoPlayer.css'; // Import custom CSS

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTag, setSelectedTag] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [editingAnnotation, setEditingAnnotation] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [popupContent, setPopupContent] = useState('');
  const [popupStyle, setPopupStyle] = useState({});
  const videoRef = useRef(null);

  const predefinedTags = ['Car', 'Tree', 'Building'];

  useEffect(() => {
    axios.get(`http://localhost:8000/api/videos/${id}/`)
      .then(response => {
        setVideoUrl(`http://localhost:8000${response.data.video_file}`);
        setAnnotations(response.data.annotations);
      })
      .catch(error => {
        console.error('Error fetching video:', error);
      });
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const videoTime = videoRef.current.currentTime;
        setCurrentTime(videoTime);

        const currentAnnotation = annotations.find(annotation => {
          return videoTime >= annotation.time && videoTime < annotation.time + 5;
        });

        if (currentAnnotation) {
          setPopupContent(`Time: ${currentAnnotation.time.toFixed(2)}s, Tag: ${currentAnnotation.tag}`);
          const rect = videoRef.current.getBoundingClientRect();
          const left = (currentAnnotation.time / videoDuration) * rect.width;
          setPopupStyle({
            left: `${left}px`,
            top: `${rect.top + 20}px`,
            display: 'block'
          });
        } else {
          setPopupContent('');
          setPopupStyle(prevStyle => ({ ...prevStyle, display: 'none' }));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [annotations, videoDuration]);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLoadedMetadata = () => {
    setVideoDuration(videoRef.current.duration);
  };

  const addAnnotation = () => {
    const tag = customTag ? customTag : selectedTag;
    if (tag) {
      axios.post(`http://localhost:8000/api/videos/${id}/annotations/`, {
        time: currentTime,
        tag,
      })
      .then(response => {
        setAnnotations([...annotations, response.data]);
        setSelectedTag('');
        setCustomTag('');
      })
      .catch(error => console.error('Error adding annotation:', error));
    }
  };

  const deleteAnnotation = (annotationId) => {
    axios.delete(`http://localhost:8000/api/videos/annotations/${annotationId}/`)
      .then(() => {
        setAnnotations(annotations.filter(a => a.id !== annotationId));
      })
      .catch(error => console.error('Error deleting annotation:', error));
  };

  const editAnnotation = (annotation) => {
    setEditingAnnotation(annotation);
    setSelectedTag(annotation.tag);
  };

  const updateAnnotation = () => {
    axios.put(`http://localhost:8000/api/videos/annotations/${editingAnnotation.id}/`, {
      time: editingAnnotation.time,
      tag: selectedTag || customTag,
    })
    .then(response => {
      setAnnotations(annotations.map(a => a.id === editingAnnotation.id ? response.data : a));
      setEditingAnnotation(null);
      setSelectedTag('');
      setCustomTag('');
    })
    .catch(error => console.error('Error updating annotation:', error));
  };

  const getMarkerStyle = (time) => {
    return {
      position: 'absolute',
      left: `${(time / videoDuration) * 100}%`,
      height: '15px',
      width: '5px',
      background: currentTime >= time && currentTime < time + 5 ? 'yellow' : 'red',
      borderRadius: '5px',
      transform: 'translateX(-50%)'
    };
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 text-center">
          <h2>Video Annotation Tool</h2>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12">
          {videoUrl ? (
            <div className="video-wrapper">
              <video
                ref={videoRef}
                className="video-player"
                controls
                onLoadedMetadata={handleLoadedMetadata}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="text-center mt-2">
                <button className="btn btn-primary me-2" onClick={handlePlayPause}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
              <div style={{ position: 'relative', height: '15px', background: '#ddd' }}>
                {annotations.map(annotation => (
                  <div
                    key={annotation.id}
                    style={getMarkerStyle(annotation.time)}
                  />
                ))}
                {popupContent && (
                  <div className="annotation-popup" style={popupStyle}>
                    {popupContent}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Loading video...</p>
          )}
        </div>
      </div>

      <div className="row my-4">
        <div className="col-md-6 mx-auto">
          <h3>{editingAnnotation ? 'Edit Annotation' : 'Add Annotation'}</h3>
          <div className="mb-3">
            <label htmlFor="tagSelect" className="form-label">Select Tag:</label>
            <select
              id="tagSelect"
              className="form-select"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Select a tag</option>
              {predefinedTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="customTagInput" className="form-label">Custom Tag:</label>
            <input
              id="customTagInput"
              type="text"
              className="form-control"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Enter custom tag"
            />
          </div>

          <div className="mb-3 text-center">
            <button className="btn btn-success" onClick={editingAnnotation ? updateAnnotation : addAnnotation}>
              {editingAnnotation ? 'Update Annotation' : 'Add Annotation'}
            </button>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12">
          <h3>Annotations</h3>
          {annotations.length > 0 ? (
            <ul className="list-group">
              {annotations.map((annotation, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Time: {annotation.time.toFixed(2)}s, Tag: {annotation.tag}</span>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editAnnotation(annotation)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteAnnotation(annotation.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No annotations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
