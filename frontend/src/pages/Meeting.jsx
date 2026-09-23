import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { LogOut } from 'lucide-react';

function Meeting() {
  const location = useLocation();
  const navigate = useNavigate();
  const { meetingId, photoUrl } = location.state || {};
  const [meetingStarted, setMeetingStarted] = useState(false);

  if (!meetingId) {
    return (
      <div className="text-center mt-4">
        <h3>Invalid meeting state. Please start from Dashboard.</h3>
        <button className="btn-primary mt-2" onClick={() => navigate('/dashboard')} style={{width: 'auto', margin: '1rem auto'}}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', background: 'var(--bg-main)'}}>
      <div style={{padding: '1rem 2rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3 style={{margin: 0}}>Collaborative Meeting Room</h3>
        <button onClick={() => navigate('/collaboration')} className="btn btn-outline" style={{padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <LogOut size={16} /> End Meeting
        </button>
      </div>

      <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
        {photoUrl && (
          <div style={{height: '25%', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid var(--border)'}}>
            <img src={photoUrl} alt="Uploaded Context" style={{height: '100%', objectFit: 'contain'}} />
          </div>
        )}
        
        <div style={{flex: 1, background: '#FFFFFF'}}>
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={meetingId}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false,
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; }}
            onApiReady={(externalApi) => {
              setMeetingStarted(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Meeting;
