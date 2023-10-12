# Friend Flow Social Media App

Friend Flow is a social media application built to connect people and foster meaningful interactions. This document provides an overview of the app, its technologies, and instructions on how to set it up.

## Table of Contents

- [Friend Flow Social Media App](#friend-flow-social-media-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Friend Flow Social Media App](#friend-flow-social-media-app-1)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **User Authentication**: Secure user authentication using JWT for seamless login and registration.
- **Post Creation and Interaction**: Users can create, edit, and delete posts. They can also like and comment on posts.
- **Real-time Updates**: Utilizes WebSocket for real-time updates on posts, comments, and likes.
- **MERN Stack**: Built with MongoDB, Express.js, React, and Node.js for a robust full-stack application.
- **Material-UI (MUI)**: Provides a beautiful and responsive user interface with the help of Material-UI components.
- **File Uploads**: Supports image uploads for user profile pictures and post images using Multer.
- **Security**: Enhanced security measures with Helmet to secure HTTP headers and CORS for controlled API access.
- **Redux State Management**: Utilizes Redux for efficient state management and global data storage.

## Technologies Used

- **Frontend**:
  - React
  - Material-UI (MUI)
  - Redux

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)

- **Middleware and Utilities**:
  - Multer (for file uploads)
  - Morgan (HTTP request logger)
  - Helmet (secure HTTP headers)
  - Cors (Cross-Origin Resource Sharing)

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js and npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/friend-flow-social-media.git
2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables:

    Create a .env file in the root directory and add the necessary variables. Example:
    ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/friend-flow
    JWT_SECRET=your_secret_key
4. Run the application:
    ```bash
    npm start
# Friend Flow Social Media App

## Usage

1. **Visit [http://localhost:{PORT}](http://localhost:{PORT}) in your browser to use Friend Flow.**

2. **Register a new account or log in with an existing one.**

3. **Create posts, like and comment on others' posts.**

4. **Experience real-time updates for new posts and interactions.**

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
