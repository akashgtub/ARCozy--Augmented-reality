import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Box, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockDesigns, mockFurniture } from '../services/mockData';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Hero Section */}
      <motion.div 
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="card flex-between"
        style={{background: 'linear-gradient(135deg, #F3F4F6 0%, #FFFFFF 100%)', padding: '4rem', marginBottom: '3rem', border: 'none'}}
      >
        <div style={{maxWidth: '600px'}}>
          <h1 className="heading-xl mb-4">Design Your Space. <br/><span style={{color: 'var(--accent)'}}>See It Before You Build It.</span></h1>
          <p className="text-body mb-6" style={{fontSize: '1.2rem'}}>
            ARcozy is the premier platform for visualizing interiors, collaborating in real-time, and finding the perfect furniture for your space using AI and AR.
          </p>
          <div className="flex-center gap-4" style={{justifyContent: 'flex-start'}}>
            <button className="btn btn-accent" onClick={() => navigate('/workspace')} style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>
              Create New Design <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/explore')} style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>
              Explore Designs
            </button>
          </div>
        </div>
        <div style={{display: 'none', '@media(minWidth: 1024px)': {display: 'block'}}}>
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=500" alt="Interior Design" style={{borderRadius: '20px', boxShadow: 'var(--shadow-lg)'}} />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid-cards mb-8">
        <div className="card text-center" onClick={() => navigate('/workspace')} style={{cursor: 'pointer'}}>
          <div className="flex-center mb-4" style={{color: 'var(--accent)', background: 'rgba(37, 99, 235, 0.1)', width: 60, height: 60, borderRadius: '50%', margin: '0 auto'}}>
            <Box size={28} />
          </div>
          <h3 className="mb-2">Start AR Experience</h3>
          <p className="text-body text-small">Launch the design studio and visualize items in your real room.</p>
        </div>
        <div className="card text-center" onClick={() => navigate('/ai-designer')} style={{cursor: 'pointer'}}>
          <div className="flex-center mb-4" style={{color: '#8B5CF6', background: 'rgba(139, 92, 246, 0.1)', width: 60, height: 60, borderRadius: '50%', margin: '0 auto'}}>
            <Sparkles size={28} />
          </div>
          <h3 className="mb-2">AI Recommendations</h3>
          <p className="text-body text-small">Let our AI suggest the perfect layout and furniture for you.</p>
        </div>
        <div className="card text-center" onClick={() => navigate('/my-designs')} style={{cursor: 'pointer'}}>
          <div className="flex-center mb-4" style={{color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', width: 60, height: 60, borderRadius: '50%', margin: '0 auto'}}>
            <LayoutDashboard size={28} />
          </div>
          <h3 className="mb-2">My Designs</h3>
          <p className="text-body text-small">Access and manage all your saved interior design projects.</p>
        </div>
      </div>

      {/* Recent Designs */}
      <div className="mb-8">
        <div className="flex-between mb-4">
          <h2 className="heading-md">Recent Designs</h2>
          <button className="btn btn-ghost" onClick={() => navigate('/my-designs')}>View All</button>
        </div>
        <div className="grid-cards">
          {mockDesigns.slice(0, 3).map(design => (
            <div key={design.id} className="card" style={{padding: 0, overflow: 'hidden'}}>
              <img src={design.image} alt={design.name} style={{width: '100%', height: 200, objectFit: 'cover'}} />
              <div style={{padding: '1.5rem'}}>
                <h4 className="mb-1">{design.name}</h4>
                <p className="text-small">{design.roomType} • {design.style}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Furniture */}
      <div className="mb-8">
        <div className="flex-between mb-4">
          <h2 className="heading-md">Popular Furniture</h2>
          <button className="btn btn-ghost" onClick={() => navigate('/furniture')}>Explore Library</button>
        </div>
        <div className="grid-cards">
          {mockFurniture.slice(0, 4).map(item => (
            <div key={item.id} className="card" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <img src={item.image} alt={item.name} style={{width: 80, height: 80, objectFit: 'cover', borderRadius: '10px'}} />
              <div>
                <h4 style={{fontSize: '1rem'}} className="mb-1">{item.name}</h4>
                <p className="text-small" style={{color: 'var(--accent)', fontWeight: 600}}>${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
