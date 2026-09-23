import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react';
import { mockFurniture } from '../services/mockData';

function FurnitureLibrary() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Storage'];

  const filtered = mockFurniture.filter(item => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="page-container">
      <div className="flex-between mb-8">
        <div>
          <h1 className="heading-lg mb-2">Furniture Library</h1>
          <p className="text-body">Explore our collection of 3D models for your designs.</p>
        </div>
        
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <div className="input-group" style={{margin: 0, minWidth: '250px'}}>
            <Search className="input-icon" size={18} style={{top: '0.8rem'}} />
            <input type="text" placeholder="Search furniture..." className="input-with-icon" style={{padding: '0.6rem 1rem 0.6rem 2.5rem', background: '#FFFFFF'}} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-outline"><Filter size={18} /> Filters</button>
        </div>
      </div>

      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem'}}>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            style={{borderRadius: '20px', padding: '0.5rem 1.5rem', whiteSpace: 'nowrap'}}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid-cards" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'}}>
        {filtered.map(item => (
          <div key={item.id} className="card" style={{padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
            <div style={{position: 'relative'}}>
              <img src={item.image} alt={item.name} style={{width: '100%', height: '220px', objectFit: 'cover'}} />
              <button className="btn btn-ghost" style={{position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '50%'}}>
                <Heart size={18} color="var(--text-muted)" />
              </button>
              <div className="badge" style={{position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(255,255,255,0.9)'}}>
                {item.category}
              </div>
            </div>
            
            <div style={{padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column'}}>
              <div className="flex-between mb-2">
                <h3 style={{fontSize: '1.25rem', margin: 0}}>{item.name}</h3>
                <span style={{fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)'}}>${item.price}</span>
              </div>
              <p className="text-small mb-4" style={{flex: 1}}>{item.dimensions} • {item.material}</p>
              
              <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
                {item.colors.map((color, idx) => (
                  <div key={idx} style={{width: 24, height: 24, borderRadius: '50%', background: color, border: '1px solid var(--border)'}}></div>
                ))}
              </div>
              
              <button className="btn btn-outline w-full"><ShoppingCart size={18} /> Add to Room</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem'}}>
            <p className="text-muted">No furniture found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FurnitureLibrary;
