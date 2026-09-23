import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, QrCode, Video, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleCapturePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        // Generate random meeting ID
        const meetingId = `arcozy_${Date.now()}`;
        // Go to meeting with photo URL
        navigate('/meeting', { state: { meetingId, photoUrl: data.url } });
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Cannot connect to server for upload.');
    } finally {
      setUploading(false);
    }
  };

  const openCamera = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{paddingTop: '2rem'}}>
      <div className="text-center mb-3">
        <h2 style={{fontSize: '2rem'}}>Welcome to your Dashboard</h2>
        <p style={{color: 'var(--text-muted)'}}>What would you like to do today?</p>
      </div>

      <div className="dashboard-grid">
        <motion.div 
          className="action-card"
          onClick={openCamera}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="action-icon">
            {uploading ? <UploadCloud size={40} /> : <Camera size={40} />}
          </div>
          <h3>{uploading ? 'Uploading...' : 'Take Photo & Meet'}</h3>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Capture a photo and instantly start a video meeting.</p>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            ref={fileInputRef} 
            onChange={handleCapturePhoto} 
            style={{ display: 'none' }} 
          />
        </motion.div>

        <motion.div 
          className="action-card"
          onClick={() => navigate('/qr-module')}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="action-icon">
            <QrCode size={40} />
          </div>
          <h3>QR Module</h3>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Generate or scan QR codes for your uploaded media.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
