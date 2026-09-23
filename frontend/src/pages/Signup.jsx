import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Cannot connect to server.');
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
          <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Join <span style={{color: 'var(--primary)'}}>AR</span>cozy</h1>
          <p style={{color: 'var(--text-muted)'}}>Create your new account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <User className="input-icon" size={20} />
            <input 
              type="text" 
              placeholder="Choose a username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Create a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3">
            <label>Confirm Password</label>
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Sign Up'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="text-center mt-4">
          <span style={{color: 'var(--text-muted)'}}>Already have an account? </span>
          <Link to="/" className="text-link">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
