import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { mockFurniture } from '../services/mockData';

function AIDesigner() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Interior Designer. How can I help you transform your space today?' }
  ]);
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    // Mock AI response
    setTimeout(() => {
      let aiResponse = "Based on your request, I recommend a modern, clean aesthetic. I've selected a few pieces that would fit perfectly into this style.";
      let recs = [];

      if (userMsg.toLowerCase().includes('bedroom')) {
        recs = mockFurniture.filter(f => f.category === 'Bedroom');
        aiResponse = "For a comfortable and stylish bedroom, these items will work beautifully together.";
      } else if (userMsg.toLowerCase().includes('office') || userMsg.toLowerCase().includes('desk')) {
        recs = mockFurniture.filter(f => f.category === 'Office' || f.category === 'Storage');
        aiResponse = "A productive workspace needs ergonomic and organized furniture. Check these out.";
      } else {
        recs = mockFurniture.slice(0, 3); // random selection
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setRecommendations(recs);
      setLoading(false);
    }, 1500);
  };

  const quickPrompts = [
    "Design my living room in a modern style",
    "Suggest furniture for a small bedroom",
    "Make this room minimalist",
    "Which sofa matches a glass table?"
  ];

  return (
    <div style={{display: 'flex', height: 'calc(100vh - 70px)', background: '#F9FAFB'}}>
      
      {/* Left: Chat Interface */}
      <div style={{width: '400px', background: '#FFFFFF', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column'}}>
        <div style={{padding: '1.5rem', borderBottom: '1px solid var(--border)'}}>
          <h2 style={{fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Bot color="var(--accent)" /> AI Designer</h2>
          <p className="text-small mt-1">Ask for style advice or furniture suggestions.</p>
        </div>

        <div style={{flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{display: 'flex', gap: '1rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'}}>
              <div style={{width: 36, height: 36, borderRadius: '50%', background: msg.sender === 'ai' ? 'rgba(37,99,235,0.1)' : 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: msg.sender === 'ai' ? 'var(--accent)' : 'var(--text-muted)'}}>
                {msg.sender === 'ai' ? <Sparkles size={18} /> : <User size={18} />}
              </div>
              <div style={{background: msg.sender === 'user' ? 'var(--accent)' : 'var(--bg-surface)', color: msg.sender === 'user' ? 'white' : 'var(--text-main)', padding: '1rem', borderRadius: '15px', borderTopLeftRadius: msg.sender === 'ai' ? 0 : '15px', borderTopRightRadius: msg.sender === 'user' ? 0 : '15px', maxWidth: '75%'}}>
                <p style={{fontSize: '0.95rem', margin: 0, lineHeight: 1.5}}>{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{display: 'flex', gap: '1rem'}}>
               <div style={{width: 36, height: 36, borderRadius: '50%', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)'}}>
                <Sparkles size={18} />
              </div>
              <div style={{background: 'var(--bg-surface)', padding: '1rem', borderRadius: '15px', borderTopLeftRadius: 0}}>
                <span className="text-muted text-small">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div style={{padding: '1.5rem', borderTop: '1px solid var(--border)'}}>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem'}}>
            {quickPrompts.map((prompt, i) => (
              <span key={i} className="badge" style={{cursor: 'pointer', border: '1px solid var(--border)'}} onClick={() => setInput(prompt)}>
                {prompt}
              </span>
            ))}
          </div>
          <form onSubmit={handleSend} style={{display: 'flex', gap: '0.5rem'}}>
            <input 
              type="text" 
              className="input-group"
              style={{flex: 1, margin: 0, padding: '0.8rem', borderRadius: '20px', border: '1px solid var(--border)', outline: 'none'}}
              placeholder="Ask the AI..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-accent" style={{borderRadius: '50%', width: '45px', height: '45px', padding: 0}} disabled={loading || !input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Right: Recommendations */}
      <div style={{flex: 1, padding: '3rem', overflowY: 'auto'}}>
        <h2 className="mb-6">Recommended for you</h2>
        
        {recommendations.length === 0 ? (
          <div className="flex-center" style={{height: '60%', flexDirection: 'column', color: 'var(--text-light)'}}>
            <Sparkles size={48} style={{marginBottom: '1rem'}} />
            <p>Tell the AI what you're looking for to see recommendations here.</p>
          </div>
        ) : (
          <div className="grid-cards" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
            {recommendations.map(item => (
              <div key={item.id} className="card" style={{padding: 0, overflow: 'hidden'}}>
                <img src={item.image} alt={item.name} style={{width: '100%', height: '200px', objectFit: 'cover'}} />
                <div style={{padding: '1.5rem'}}>
                  <h4 className="mb-1" style={{fontSize: '1.1rem'}}>{item.name}</h4>
                  <p className="text-small mb-4" style={{color: 'var(--accent)', fontWeight: 600}}>${item.price}</p>
                  <button className="btn btn-primary w-full text-small" style={{padding: '0.6rem'}}>View in Workspace</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default AIDesigner;
