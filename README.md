

# Video Annotation Application

## Overview

This application is designed to manage and annotate videos. Users can register, log in, view their uploaded videos, search for videos by annotations, and add or edit annotations on the video timeline. 

## Features

1. **User Registration**: New users can create an account by providing a username, email, and password.
2. **User Login**: Registered users can log in to access their uploaded videos and manage annotations.
3. **Upload Videos**: Users can upload videos after logging in.
4. **View Videos**: Users can view a list of their uploaded videos.
5. **Search Videos**: Users can search for videos by annotation tags.
6. **Video Playback and Annotation**: Users can play videos, add, edit, and delete annotations on the video timeline.
7. **Annotation Display**: Annotations are displayed as markers on the video timeline, with popup information showing when the video reaches an annotation.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/video-annotation-app.git
   cd video-annotation-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```

   This will start the application on `http://localhost:3000`.

4. **Backend Setup** (if applicable):
   Ensure your backend server is running on `http://localhost:8000` or update the API URLs in the code.

## Components

### 1. Register Component

- **File**: `src/components/Register.js`
- **Description**: Allows new users to register by providing a username, email, and password. After successful registration, users are redirected to the login page.

### 2. Login Component

- **File**: `src/components/Login.js`
- **Description**: Allows users to log in with their username and password. On successful login, users are redirected to their video management page.

### 3. User Videos Component

- **File**: `src/components/UserVideos.js`
- **Description**: Displays a list of videos uploaded by the logged-in user. Users can view their videos by clicking on the "View" button.

### 4. Search Videos Component

- **File**: `src/components/SearchVideos.js`
- **Description**: Provides a search interface for finding videos by annotation tags. Displays search results with links to view the videos.

### 5. Video Player Component

- **File**: `src/components/VideoPlayer.js`
- **Description**: Provides video playback functionality and allows users to add, edit, and delete annotations. Displays annotations as markers on the video timeline and shows a popup with annotation details when they are reached.

## API Endpoints

- **Register User**: `POST http://localhost:8000/api/videos/register/`
- **Login User**: `POST http://localhost:8000/api/videos/login/`
- **Upload Video**: `POST http://localhost:8000/api/videos/upload/`
- **Get User Videos**: `GET http://localhost:8000/api/videos/user/videos/`
- **Search Videos by Tag**: `GET http://localhost:8000/api/videos/search/?tag={tag}`
- **Get Video Details**: `GET http://localhost:8000/api/videos/{id}/`
- **Add Annotation**: `POST http://localhost:8000/api/videos/{id}/annotations/`
- **Edit Annotation**: `PUT http://localhost:8000/api/videos/annotations/{id}/`
- **Delete Annotation**: `DELETE http://localhost:8000/api/videos/annotations/{id}/`

## Usage

1. **Register**: Go to the registration page to create a new account.
2. **Login**: Log in to access your dashboard.
3. **Upload Videos**: Upload your videos from the dashboard.
4. **Search Videos**: Use the search feature to find videos by annotation tags.
5. **View and Annotate Videos**: Click on a video to view and annotate it. Use the player controls to add, edit, or delete annotations.


### Report: Features and Functionality

#### 1. **User Registration**

- **Functionality**: Allows new users to register by entering a username, email, and password.
- **Implementation**: Uses `axios` to send a POST request to the backend. On successful registration, the user is redirected to the login page.

#### 2. **User Login**

- **Functionality**: Allows existing users to log in using their username and password.
- **Implementation**: Uses `axios` to authenticate the user. Upon successful login, the user is redirected to the video management page.

#### 3. **Upload Videos**

- **Functionality**: Enables users to upload their videos to the server.
- **Implementation**: Not explicitly detailed in the provided code but should involve a file upload form and API call.

#### 4. **View User Videos**

- **Functionality**: Displays a list of videos uploaded by the logged-in user.
- **Implementation**: Fetches user-specific video data from the backend using an API call and displays it in a list.

#### 5. **Search Videos**

- **Functionality**: Allows users to search for videos based on annotation tags.
- **Implementation**: Sends a search query to the backend and displays the results. Handles cases where no videos are found.

#### 6. **Video Playback and Annotation**

- **Functionality**: Provides video playback functionality with the ability to add, edit, and delete annotations.
- **Implementation**:
  - **Playback**: Uses HTML5 `<video>` element and controls.
  - **Annotations**: 
    - Annotations are fetched and displayed as markers on the video timeline.
    - Users can add new annotations, edit existing ones, and delete them.
    - Annotation markers are displayed in real-time based on video playback.

#### 7. **Annotation Popup**

- **Functionality**: Shows a popup with annotation details when the video reaches an annotation.
- **Implementation**: Uses CSS for positioning and styling the popup. Updates the popup content and position based on the current video time.

