import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In production, this should point to your deployed backend URL or use a proxy
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        onLogin({ username: data.username });
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%'}}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card" 
        style={{width: '100%', maxWidth: '400px'}}
      >
        <div className="text-center mb-3">
          <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}><span style={{color: 'var(--primary)'}}>AR</span>cozy</h1>
          <p style={{color: 'var(--text-muted)'}}>Sign in to your account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <User className="input-icon" size={20} />
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3">
            <label>Password</label>
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="text-center mt-4">
          <span style={{color: 'var(--text-muted)'}}>Don't have an account? </span>
          <Link to="/signup" className="text-link">Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
