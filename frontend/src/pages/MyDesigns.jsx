import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Grid, List, MoreVertical, Star, Pencil, Copy, Trash2, Share2 } from 'lucide-react';
import { mockDesigns } from '../services/mockData';

function MyDesigns() {
  const navigate = useNavigate();
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');

  const filtered = mockDesigns.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-container">
      <div className="flex-between mb-8">
        <div>
          <h1 className="heading-lg mb-2">My Designs</h1>
          <p className="text-body">Manage all your interior design projects here.</p>
        </div>
        
        <button className="btn btn-primary" onClick={() => navigate('/workspace')}>
          <Plus size={18} /> Create New Design
        </button>
      </div>

      <div className="flex-between mb-6">
        <div className="input-group" style={{margin: 0, minWidth: '300px'}}>
          <Search className="input-icon" size={18} style={{top: '0.8rem'}} />
          <input type="text" placeholder="Search designs..." className="input-with-icon" style={{padding: '0.6rem 1rem 0.6rem 2.5rem', background: '#FFFFFF'}} value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div style={{display: 'flex', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.3rem', borderRadius: '10px'}}>
          <button className={`btn btn-ghost ${view === 'grid' ? 'active' : ''}`} style={{padding: '0.4rem', background: view === 'grid' ? 'white' : 'transparent', boxShadow: view === 'grid' ? 'var(--shadow-sm)' : 'none'}} onClick={() => setView('grid')}>
            <Grid size={18} />
          </button>
          <button className={`btn btn-ghost ${view === 'list' ? 'active' : ''}`} style={{padding: '0.4rem', background: view === 'list' ? 'white' : 'transparent', boxShadow: view === 'list' ? 'var(--shadow-sm)' : 'none'}} onClick={() => setView('list')}>
            <List size={18} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid-cards">
          {filtered.map(design => (
            <div key={design.id} className="card" style={{padding: 0, overflow: 'hidden'}}>
              <div style={{position: 'relative', height: '200px'}}>
                <img src={design.image} alt={design.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <button className="btn btn-ghost" style={{position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '50%'}}>
                  <Star size={16} fill={design.favorite ? "var(--accent)" : "none"} color={design.favorite ? "var(--accent)" : "var(--text-muted)"} />
                </button>
              </div>
              <div style={{padding: '1.5rem'}}>
                <div className="flex-between mb-1">
                  <h3 style={{fontSize: '1.1rem'}}>{design.name}</h3>
                  <button className="btn btn-ghost" style={{padding: '0.2rem'}}><MoreVertical size={18} /></button>
                </div>
                <p className="text-small mb-4">{design.roomType} • Edited {design.lastModified}</p>
                <div className="flex-between" style={{borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem'}}>
                  <button className="btn btn-ghost text-small" style={{padding: '0.4rem'}} onClick={() => navigate('/workspace')}><Pencil size={14} /> Edit</button>
                  <button className="btn btn-ghost text-small" style={{padding: '0.4rem'}} onClick={() => navigate('/collaboration')}><Share2 size={14} /> Share</button>
                  <button className="btn btn-ghost text-small" style={{padding: '0.4rem', color: 'var(--danger)'}}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{padding: 0, overflow: 'hidden'}}>
          {filtered.map((design, index) => (
            <div key={design.id} style={{display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: index < filtered.length -1 ? '1px solid var(--border)' : 'none'}}>
              <img src={design.image} alt={design.name} style={{width: 60, height: 60, objectFit: 'cover', borderRadius: '8px', marginRight: '1.5rem'}} />
              <div style={{flex: 1}}>
                <h4 style={{fontSize: '1rem', margin: 0}}>{design.name} <Star size={14} fill={design.favorite ? "var(--accent)" : "none"} color={design.favorite ? "var(--accent)" : "var(--text-muted)"} style={{marginLeft: '0.5rem', verticalAlign: 'middle'}}/></h4>
                <p className="text-small">{design.roomType}</p>
              </div>
              <div style={{width: '150px'}} className="text-small text-muted">{design.lastModified}</div>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button className="btn btn-ghost" title="Edit"><Pencil size={18} /></button>
                <button className="btn btn-ghost" title="Duplicate"><Copy size={18} /></button>
                <button className="btn btn-ghost" title="Share"><Share2 size={18} /></button>
                <button className="btn btn-ghost" style={{color: 'var(--danger)'}} title="Delete"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDesigns;
