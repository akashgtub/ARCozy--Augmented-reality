import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Home, Compass, LayoutDashboard, Sofa, Sparkles, Users, LogOut, User } from 'lucide-react';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <NavLink to="/home" className="nav-brand" style={{textDecoration: 'none'}}>
        <Box color="var(--accent)" size={28} />
        <span style={{color: 'var(--primary)', fontWeight: 700}}>AR</span>cozy
      </NavLink>

      <div className="nav-links" style={{display: 'flex', gap: '2rem'}}>
        <NavLink to="/home" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
          <Home size={18} /> Home
        </NavLink>
        <NavLink to="/explore" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
          <Compass size={18} /> Explore
        </NavLink>
        <NavLink to="/my-designs" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
          <LayoutDashboard size={18} /> My Designs
        </NavLink>
        <NavLink to="/furniture" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
          <Sofa size={18} /> Furniture
        </NavLink>
        <NavLink to="/ai-designer" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
          <Sparkles size={18} /> AI Designer
        </NavLink>
        <NavLink to="/collaboration" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
          <Users size={18} /> Collaboration
        </NavLink>
      </div>

      <div className="flex-center gap-4">
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem'}}>
          <div style={{width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <User size={16} />
          </div>
          {user.username}
        </div>
        <button onClick={handleLogout} className="btn btn-ghost" style={{padding: '0.5rem', borderRadius: '50%'}} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
