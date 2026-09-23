import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import DesignWorkspace from './pages/DesignWorkspace';
import FurnitureLibrary from './pages/FurnitureLibrary';
import AIDesigner from './pages/AIDesigner';
import MyDesigns from './pages/MyDesigns';
import Collaboration from './pages/Collaboration';
import Explore from './pages/Explore';
import Meeting from './pages/Meeting';
import QRModule from './pages/QRModule';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('arcozy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('arcozy_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('arcozy_user');
  };

  return (
    <Router>
      <div className="app-container">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/workspace" element={user ? <DesignWorkspace /> : <Navigate to="/" />} />
          <Route path="/furniture" element={user ? <FurnitureLibrary /> : <Navigate to="/" />} />
          <Route path="/ai-designer" element={user ? <AIDesigner /> : <Navigate to="/" />} />
          <Route path="/my-designs" element={user ? <MyDesigns /> : <Navigate to="/" />} />
          <Route path="/collaboration" element={user ? <Collaboration /> : <Navigate to="/" />} />
          <Route path="/explore" element={user ? <Explore /> : <Navigate to="/" />} />
          
          {/* Kept existing modules but integrated them */}
          <Route path="/meeting" element={user ? <Meeting /> : <Navigate to="/" />} />
          <Route path="/qr-module" element={user ? <QRModule /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
