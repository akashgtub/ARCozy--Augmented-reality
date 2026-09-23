# ARCozy Web Application

ARCozy is a modern web application (formerly Flutter) converted into a React + Node.js architecture.

## Features
- **Secure Authentication**: Built with Node.js and SQLite.
- **Dynamic Dashboard**: Take photos, upload media, and quickly join Jitsi meetings.
- **QR Module**: Generate and scan QR codes directly using your device camera.

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

## How to Run

To run the project, you need to start both the backend server and the frontend React app in two separate terminal windows.

### 1. Start the Backend
Open your terminal, navigate to the `backend` folder, and start the server:

```bash
cd backend
npm install
npm start
```
*The backend will run on http://localhost:5000*

### 2. Start the Frontend
Open a second terminal window, navigate to the `frontend` folder, and start the development server:

```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on a local port (usually http://localhost:5173).*

---
**Note:** A default admin account is pre-configured. You can log in using:
- **Username**: `admin`
- **Password**: `1234`
