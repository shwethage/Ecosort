import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EcoBot from './EcoBot';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [disposalChannel, setDisposalChannel] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const navigate = useNavigate();

  const fetchItems = () => {
    fetch('https://ecosort-backend-ha85.onrender.com/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { itemName, category, estimatedValue: Number(estimatedValue), disposalChannel };

    try {
      const response = await fetch('https://ecosort-backend-ha85.onrender.com/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        setItemName('');
        setCategory('Electronics');
        setEstimatedValue('');
        setDisposalChannel('');
        fetchItems();
      }
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://ecosort-backend-ha85.onrender.com/api/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(items.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://ecosort-backend-ha85.onrender.com/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName: editName }),
      });

      if (response.ok) {
        setEditingId(null);
        setEditName('');
        fetchItems();
      }
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const totalValue = items.reduce((acc, curr) => acc + (Number(curr.estimatedValue) || 0), 0);
  const uniqueCategories = [...new Set(items.map(item => item.category))].length;

  return (
    <div className="ecosort-container">
      {/* Enterprise Dashboard Header */}
      <header className="dashboard-header" style={{
        background: 'linear-gradient(rgba(27, 94, 32, 0.85), rgba(46, 125, 50, 0.9)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '30px 40px',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-soft)',
        marginBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '8px' }}>
            🟢 Secure Portal Active
          </span>
          <h1>🌱 EcoSort Command Center</h1>
          <p>Enterprise Green-Tech Material & Waste Management Portal</p>
        </div>
        <button onClick={() => navigate('/')} className="logout-btn">
          Sign Out 🚪
        </button>
      </header>

      {/* KPI Stats Analytics Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <span className="title">Total Tracked Items</span>
          <span className="value">{items.length} Units</span>
        </div>
        <div className="kpi-card" style={{ borderLeftColor: '#ef6c00' }}>
          <span className="title">Portfolio Material Value</span>
          <span className="value" style={{ color: '#ef6c00' }}>₹{totalValue}</span>
        </div>
        <div className="kpi-card" style={{ borderLeftColor: '#0288d1' }}>
          <span className="title">Active Categories</span>
          <span className="value" style={{ color: '#0288d1' }}>{uniqueCategories} Types</span>
        </div>
      </div>

      {/* Workspace Grid Layout */}
      <div className="workspace-grid">
        {/* Left Column: Input Form Panel */}
        <div className="panel-card">
          <h3>📦 Register New Asset</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Item Name / Description</label>
              <input type="text" placeholder="e.g., Industrial Server, Copper Wire" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Material Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Electronics">Electronics / E-Waste</option>
                <option value="Plastics">Plastics & Polymers</option>
                <option value="Organic">Organic Waste</option>
                <option value="Metals">Recyclable Metals</option>
                <option value="Glass">Glass Materials</option>
              </select>
            </div>
            <div className="input-group">
              <label>Estimated Value (₹)</label>
              <input type="number" placeholder="e.g., 1200" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Designated Disposal Channel</label>
              <input type="text" placeholder="e.g., Eco-Recycle Hub #4" value={disposalChannel} onChange={(e) => setDisposalChannel(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary">Register into Inventory</button>
          </form>
        </div>

        {/* Right Column: Inventory Grid Display */}
        <div className="inventory-panel">
          <div className="inventory-topbar">
            <h3>♻️ Active Material Inventory</h3>
            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>
              Live Database Feed Connected 🟢
            </span>
          </div>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#777' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>No inventory items logged yet.</p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>Use the left registration panel to add your first waste or recyclable item.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {items.map((item) => (
                <div key={item._id} className="inventory-item-card">
                  <div>
                    {editingId === item._id ? (
                      <input 
                        type="text" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)} 
                        style={{ width: '100%', marginBottom: '12px', padding: '6px' }}
                      />
                    ) : (
                      <h4>{item.itemName}</h4>
                    )}
                    <div className="spec-row">
                      <span>Category:</span>
                      <span className="highlight">{item.category}</span>
                    </div>
                    <div className="spec-row">
                      <span>Est. Value:</span>
                      <span className="highlight" style={{ color: '#2e7d32' }}>₹{item.estimatedValue}</span>
                    </div>
                    <div className="spec-row">
                      <span>Channel:</span>
                      <span className="highlight">{item.disposalChannel}</span>
                    </div>
                  </div>
                  
                  <div className="card-actions-bar">
                    {editingId === item._id ? (
                      <button onClick={() => handleUpdate(item._id)} className="btn-sm btn-save">Save Changes</button>
                    ) : (
                      <button onClick={() => { setEditingId(item._id); setEditName(item.itemName); }} className="btn-sm btn-edit">Edit</button>
                    )}
                    <button onClick={() => handleDelete(item._id)} className="btn-sm btn-delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EcoBot />
    </div>
  );
}