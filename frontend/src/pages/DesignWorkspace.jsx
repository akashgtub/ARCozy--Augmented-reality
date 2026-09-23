import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Undo, Redo, Save, Share2, Sparkles, Move, RotateCw, Maximize, Palette, Trash2, Copy, Search, Layers } from 'lucide-react';
import { mockFurniture } from '../services/mockData';

function DesignWorkspace() {
  const navigate = useNavigate();
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFurniture = mockFurniture.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', background: '#F8F9FA'}}>
      
      {/* Top Toolbar */}
      <div style={{height: '60px', background: '#FFFFFF', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem'}}>
        <div style={{display: 'flex', gap: '1rem'}}>
          <button className="btn btn-ghost" title="Undo"><Undo size={18} /></button>
          <button className="btn btn-ghost" title="Redo"><Redo size={18} /></button>
        </div>
        <div style={{display: 'flex', gap: '1rem'}}>
          <button className="btn btn-outline" style={{padding: '0.4rem 1rem'}} onClick={() => alert('Design Saved!')}><Save size={16} /> Save</button>
          <button className="btn btn-outline" style={{padding: '0.4rem 1rem'}} onClick={() => navigate('/collaboration')}><Share2 size={16} /> Share</button>
          <button className="btn btn-accent" style={{padding: '0.4rem 1rem'}} onClick={() => navigate('/ai-designer')}><Sparkles size={16} /> AI Assistant</button>
        </div>
      </div>

      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        
        {/* LEFT: Furniture Catalog */}
        <div style={{width: '300px', background: '#FFFFFF', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column'}}>
          <div style={{padding: '1.5rem', borderBottom: '1px solid var(--border)'}}>
            <h3 className="mb-4">Furniture</h3>
            <div className="input-group" style={{margin: 0}}>
              <Search className="input-icon" size={16} style={{top: '1rem'}} />
              <input type="text" placeholder="Search library..." className="input-with-icon" value={search} onChange={(e) => setSearch(e.target.value)} style={{padding: '0.6rem 1rem 0.6rem 2.5rem'}} />
            </div>
          </div>
          <div style={{flex: 1, overflowY: 'auto', padding: '1rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
              {filteredFurniture.map(item => (
                <div key={item.id} className="card" style={{padding: '0.5rem', cursor: 'pointer', border: selectedFurniture === item.id ? '2px solid var(--accent)' : '1px solid var(--border)'}} onClick={() => setSelectedFurniture(item.id)}>
                  <img src={item.image} alt={item.name} style={{width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem'}} />
                  <p className="text-small" style={{fontSize: '0.75rem', fontWeight: 500, textAlign: 'center', margin: 0}}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: AR / 3D Visualization */}
        <div style={{flex: 1, position: 'relative', display: 'flex', flexDirection: 'column'}}>
          <div style={{flex: 1, position: 'relative', background: '#E9ECEF', backgroundImage: 'radial-gradient(#CED4DA 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
            {/* Mock 3D Area / AR Canvas */}
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
              <Box size={64} color="var(--text-light)" style={{marginBottom: '1rem'}} />
              <p className="text-muted">3D / AR Canvas Area</p>
              <p className="text-small">Drag and drop furniture here to visualize.</p>
            </div>
            
            {/* Mock placed object */}
            {selectedFurniture && (
              <div style={{position: 'absolute', top: '40%', left: '40%', width: '150px', height: '100px', border: '2px dashed var(--accent)', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span className="text-small" style={{color: 'var(--accent)', fontWeight: 600}}>Selected Object</span>
              </div>
            )}
          </div>
          
          {/* BOTTOM: Timeline / Layers */}
          <div style={{height: '150px', background: '#FFFFFF', borderTop: '1px solid var(--border)', padding: '1rem'}}>
            <div className="flex-between mb-2">
              <h4 style={{fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Layers size={16} /> Room Elements</h4>
            </div>
            <div style={{display: 'flex', gap: '1rem', overflowX: 'auto'}}>
              {/* Mock Layers */}
              <div className="card" style={{padding: '0.5rem 1rem', minWidth: '150px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)'}}>
                <div style={{width: 30, height: 30, background: '#D1D5DB', borderRadius: '4px'}}></div>
                <span className="text-small">Base Room</span>
              </div>
              {selectedFurniture && (
                <div className="card" style={{padding: '0.5rem 1rem', minWidth: '150px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--accent)'}}>
                  <div style={{width: 30, height: 30, background: 'var(--accent)', borderRadius: '4px'}}></div>
                  <span className="text-small">New Furniture</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Object Properties */}
        <div style={{width: '280px', background: '#FFFFFF', borderLeft: '1px solid var(--border)', padding: '1.5rem', overflowY: 'auto'}}>
          <h3 className="mb-6">Properties</h3>
          
          <div className="mb-6">
            <h4 className="text-small mb-2" style={{textTransform: 'uppercase', letterSpacing: '0.05em'}}>Transform</h4>
            <div className="grid-cards" style={{gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
              <button className="btn btn-outline" style={{padding: '0.5rem', fontSize: '0.8rem'}}><Move size={14} /> Position</button>
              <button className="btn btn-outline" style={{padding: '0.5rem', fontSize: '0.8rem'}}><RotateCw size={14} /> Rotate</button>
              <button className="btn btn-outline" style={{padding: '0.5rem', fontSize: '0.8rem', gridColumn: 'span 2'}}><Maximize size={14} /> Scale</button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-small mb-2" style={{textTransform: 'uppercase', letterSpacing: '0.05em'}}>Material & Color</h4>
            <button className="btn btn-outline w-full mb-2" style={{padding: '0.5rem', fontSize: '0.8rem', justifyContent: 'flex-start'}}><Palette size={14} /> Change Material</button>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <div style={{width: 30, height: 30, borderRadius: '50%', background: '#2B2B2B', cursor: 'pointer', border: '2px solid var(--border)'}}></div>
              <div style={{width: 30, height: 30, borderRadius: '50%', background: '#D2B48C', cursor: 'pointer', border: '2px solid var(--border)'}}></div>
              <div style={{width: 30, height: 30, borderRadius: '50%', background: '#F5F5DC', cursor: 'pointer', border: '2px solid var(--border)'}}></div>
            </div>
          </div>

          <div style={{marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem'}}>
            <div className="grid-cards" style={{gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
              <button className="btn btn-outline" style={{padding: '0.5rem', fontSize: '0.8rem'}}><Copy size={14} /> Duplicate</button>
              <button className="btn btn-outline" style={{padding: '0.5rem', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'var(--danger)'}} onClick={() => setSelectedFurniture(null)}><Trash2 size={14} /> Delete</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DesignWorkspace;
