# Real-Time Chat Application

## Overview
This is a real-time chat application built with React, Node.js, Express, and MongoDB. The application features a universal chat room accessible to authenticated users, providing a seamless real-time messaging experience using WebSockets (Socket.io).

## Features
- Universal Chat Room: A single chat room that all authenticated users can access.
- Authentication: Login system to ensure only authenticated users can access the chat room.
- Real-time Messaging: Messages are instantly visible to all users in the chat room.
- Responsive Design: Works well on both desktop and mobile devices.
- Security: Basic security measures to protect against common vulnerabilities.

## Technologies Used
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- WebSockets: Socket.io
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS

# Getting Started
## Installation
1. Clone the repository:
   git clone https://github.com/ShamnaNoushad/Chat-Application
   cd Chat-Application
2. Install dependencies:
    (To check which dependencies are installed, you can refer to the package.json file.)
    - cd backend and cd ../frontend
    - npm install
3. Set up environment variables:
   Create a .env file in the backend directory and provide MongoDB connection string and jwt 
   secret key
4. Run the backend server: nodemon index.js
5. Run the frontend server: npm start
6. Access the application:
   The backend server runs on port 4000.
   Open your browser and navigate to http://localhost:3000
   
## Demo Credentials
Use the following credentials to log in without signing up:
- Username: Admin
- Email : admin@gmail.com
- Password: 123
  
## Security
### Authentication
- User authentication is implemented using JSON Web Tokens (JWT).
- Upon successful login, a JWT token is generated and stored in the client-side localStorage.
- This token is used to authenticate subsequent requests to protected routes on the server.
- JWT tokens are signed using a secret key stored in the environment variable for enhanced security.
### Password Hashing
- User passwords are securely hashed using bcrypt before being stored in the database.
- This ensures that user passwords are not stored in plain text and are protected against unauthorized access.

## Project Structure
- frontend: Contains the React frontend code
- backend: Contains the Node.js backend code
- .env: Environment variables


