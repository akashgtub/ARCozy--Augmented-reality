import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Link as LinkIcon, QrCode, Video, Mail, Copy, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

function Collaboration() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const designId = "arcozy_d_" + Math.random().toString(36).substring(7);
  const shareLink = `${window.location.origin}/workspace?shareId=${designId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartLive = () => {
    navigate('/meeting', { state: { meetingId: designId } });
  };

  return (
    <div className="page-container" style={{maxWidth: '1000px'}}>
      <div className="flex-between mb-8">
        <div>
          <h1 className="heading-lg mb-2">Collaboration</h1>
          <p className="text-body">Share your designs, invite team members, or start a live AR session.</p>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
        
        {/* Left Column: Actions */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          
          <div className="card">
            <h3 className="mb-4 flex-center" style={{justifyContent: 'flex-start', gap: '0.5rem'}}><LinkIcon size={20} color="var(--accent)" /> Share Link</h3>
            <p className="text-small mb-4">Anyone with this link can view your design in 3D.</p>
            
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <input type="text" readOnly value={shareLink} className="input-group" style={{margin: 0, flex: 1, padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px'}} />
              <button className="btn btn-primary" onClick={handleCopy} style={{padding: '0.8rem'}}>
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
            </div>
            
            <div style={{marginTop: '1.5rem', display: 'flex', gap: '1rem'}}>
               <button className="btn btn-outline flex-center w-full" onClick={() => setShowQR(!showQR)}>
                <QrCode size={18} /> {showQR ? 'Hide QR' : 'Show QR'}
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4 flex-center" style={{justifyContent: 'flex-start', gap: '0.5rem'}}><Video size={20} color="var(--success)" /> Live Session</h3>
            <p className="text-small mb-4">Start a real-time Jitsi video meeting to discuss the design.</p>
            <button className="btn btn-primary w-full" style={{background: 'var(--success)'}} onClick={handleStartLive}>
              <Video size={18} /> Start Live Meeting
            </button>
          </div>

          <div className="card">
            <h3 className="mb-4 flex-center" style={{justifyContent: 'flex-start', gap: '0.5rem'}}><Mail size={20} color="var(--primary)" /> Invite via Email</h3>
            <div className="input-group mb-2">
              <input type="email" placeholder="colleague@example.com" style={{padding: '0.8rem'}} />
            </div>
            <button className="btn btn-outline w-full">Send Invite</button>
          </div>

        </div>

        {/* Right Column: QR Code & Active Collaborators */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          
          {showQR && (
            <div className="card flex-center" style={{flexDirection: 'column', padding: '3rem', animation: 'fadeIn 0.3s ease'}}>
              <h3 className="mb-4">Scan to View</h3>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)'}}>
                <QRCodeSVG value={shareLink} size={200} />
              </div>
              <p className="text-small text-muted mt-4 text-center">Point your mobile camera at this QR code to instantly open the AR view on your phone.</p>
            </div>
          )}

          <div className="card" style={{flex: 1}}>
            <h3 className="mb-4 flex-center" style={{justifyContent: 'flex-start', gap: '0.5rem'}}><Users size={20} /> Active Collaborators</h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div className="flex-between" style={{padding: '1rem', border: '1px solid var(--border)', borderRadius: '10px'}}>
                <div className="flex-center gap-2">
                  <div style={{width: 32, height: 32, background: 'var(--accent)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>Y</div>
                  <div>
                    <p style={{fontWeight: 500, fontSize: '0.9rem'}}>You (Owner)</p>
                    <p className="text-small text-muted">Viewing</p>
                  </div>
                </div>
              </div>
              <div className="flex-center" style={{padding: '2rem', border: '1px dashed var(--border)', borderRadius: '10px', color: 'var(--text-light)'}}>
                <p className="text-small">No other collaborators currently online.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Collaboration;
