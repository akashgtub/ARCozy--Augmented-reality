import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, ArrowRight } from 'lucide-react';
import { mockExplore } from '../services/mockData';

function Explore() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Living Room', 'Bedroom', 'Office', 'Kitchen', 'Luxury', 'Minimal', 'Modern'];

  const filtered = mockExplore.filter(item => {
    if (activeCategory === 'All') return true;
    return item.roomType === activeCategory || item.style === activeCategory;
  });

  return (
    <div className="page-container">
      <div className="text-center mb-8" style={{maxWidth: '600px', margin: '0 auto 3rem'}}>
        <h1 className="heading-lg mb-4">Design Inspiration</h1>
        <p className="text-body">Discover beautiful room designs crafted by professionals and the community. Find your style and start customizing.</p>
        
        <div className="input-group" style={{marginTop: '2rem'}}>
          <Search className="input-icon" size={18} style={{top: '1rem'}} />
          <input type="text" placeholder="Search for styles, rooms, or colors..." className="input-with-icon" style={{padding: '1rem 1rem 1rem 2.8rem', borderRadius: '30px', boxShadow: 'var(--shadow-sm)'}} />
        </div>
      </div>

      <div style={{display: 'flex', gap: '1rem', marginBottom: '3rem', justifyContent: 'center', flexWrap: 'wrap'}}>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`btn ${activeCategory === cat ? 'btn-accent' : 'btn-ghost'}`}
            style={{borderRadius: '20px', padding: '0.4rem 1.2rem', border: activeCategory === cat ? 'none' : '1px solid var(--border)'}}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid-cards" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem'}}>
        {filtered.map((item, index) => (
          <div key={item.id} className="card" style={{padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-md)'}}>
            <div style={{position: 'relative', height: '280px'}}>
              <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'}}></div>
              
              <button className="btn btn-ghost" style={{position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '0.5rem', borderRadius: '50%', color: 'white'}}>
                <Heart size={18} />
              </button>
              
              <div style={{position: 'absolute', bottom: '20px', left: '20px', right: '20px', color: 'white'}}>
                <div style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <span className="badge" style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}>{item.roomType}</span>
                  <span className="badge" style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}>{item.style}</span>
                </div>
                <h3 style={{color: 'white', fontSize: '1.4rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>{item.name}</h3>
              </div>
            </div>
            
            <div style={{padding: '1.25rem', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <button className="btn btn-ghost text-small" style={{padding: '0.5rem'}}>View Design</button>
              <button className="btn btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => navigate('/workspace')}>
                Use This Design <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem'}}>
            <p className="text-muted">No inspiration found for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
