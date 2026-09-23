import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Scan, X } from 'lucide-react';
import { motion } from 'framer-motion';

function QRModule() {
  const [activeTab, setActiveTab] = useState('generate');
  const [qrText, setQrText] = useState('https://arcozy.app');
  const [scannedResult, setScannedResult] = useState(null);

  useEffect(() => {
    let scanner = null;
    
    if (activeTab === 'scan') {
      scanner = new Html5QrcodeScanner("reader", { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      }, false);
      
      scanner.render((decodedText) => {
        setScannedResult(decodedText);
        scanner.clear();
      }, (error) => {
        // console.warn(error);
      });
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(e => console.error(e));
      }
    };
  }, [activeTab]);

  return (
    <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
      <div className="text-center mb-3">
        <h2 style={{fontSize: '2rem'}}>QR Module</h2>
        <p style={{color: 'var(--text-muted)'}}>Generate or scan QR codes</p>
      </div>

      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center'}}>
        <button 
          className={`btn-primary ${activeTab !== 'generate' ? 'btn-secondary' : ''}`}
          style={{width: 'auto', padding: '0.8rem 2rem'}}
          onClick={() => { setActiveTab('generate'); setScannedResult(null); }}
        >
          <QrCode size={18} /> Generate
        </button>
        <button 
          className={`btn-primary ${activeTab !== 'scan' ? 'btn-secondary' : ''}`}
          style={{width: 'auto', padding: '0.8rem 2rem'}}
          onClick={() => { setActiveTab('scan'); setScannedResult(null); }}
        >
          <Scan size={18} /> Scan
        </button>
      </div>

      <div className="glass-card">
        {activeTab === 'generate' && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center">
            <div className="input-group mb-3" style={{maxWidth: '400px', margin: '0 auto 2rem'}}>
              <input 
                type="text" 
                value={qrText} 
                onChange={(e) => setQrText(e.target.value)}
                placeholder="Enter text or URL"
                style={{paddingLeft: '1rem'}}
              />
            </div>
            
            <div style={{background: 'white', padding: '2rem', borderRadius: '20px', display: 'inline-block'}}>
              <QRCodeSVG value={qrText || 'https://arcozy.app'} size={200} />
            </div>
          </motion.div>
        )}

        {activeTab === 'scan' && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
            {!scannedResult ? (
              <div id="reader" style={{width: '100%', maxWidth: '400px', margin: '0 auto', background: 'white', color: 'black', borderRadius: '15px', overflow: 'hidden'}}></div>
            ) : (
              <div className="text-center">
                <div style={{color: 'var(--success)', marginBottom: '1rem'}}>
                  <Scan size={48} />
                </div>
                <h3>Scan Successful!</h3>
                <div style={{background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '10px', marginTop: '1rem', wordBreak: 'break-all'}}>
                  {scannedResult.startsWith('http') ? (
                    <a href={scannedResult} target="_blank" rel="noopener noreferrer" className="text-link" style={{fontSize: '1.2rem'}}>{scannedResult}</a>
                  ) : (
                    <p style={{fontSize: '1.2rem', margin: 0}}>{scannedResult}</p>
                  )}
                </div>
                <button className="btn-secondary mt-4" style={{padding: '0.8rem 2rem'}} onClick={() => setScannedResult(null)}>
                  Scan Another
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default QRModule;
