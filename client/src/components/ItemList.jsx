import React, { useEffect, useState } from 'react';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchItems = () => {
    fetch('https://ecosort-backend-ha85.onrender.com/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
        fetchItems(); // Refresh list with updated data
      }
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '550px' }}>
      <h2>🌱 EcoSort Waste Inventory</h2>
      {items.length === 0 ? (
        <p>No waste items recorded yet.</p>
      ) : (
        <ul style={{ paddingLeft: '0' }}>
          {items.map((item) => (
            <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
              <div>
                {editingId === item._id ? (
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    placeholder="New name..."
                  />
                ) : (
                  <strong>{item.itemName}</strong>
                )}
                <span> - {item.category} (${item.estimatedValue})</span>
              </div>
              <div>
                {editingId === item._id ? (
                  <button onClick={() => handleUpdate(item._id)} style={{ background: 'green', color: 'white', border: 'none', padding: '5px 8px', marginRight: '5px', cursor: 'pointer', borderRadius: '4px' }}>Save</button>
                ) : (
                  <button onClick={() => { setEditingId(item._id); setEditName(item.itemName); }} style={{ background: '#ffa500', color: 'white', border: 'none', padding: '5px 8px', marginRight: '5px', cursor: 'pointer', borderRadius: '4px' }}>Edit</button>
                )}
                <button onClick={() => handleDelete(item._id)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 8px', cursor: 'pointer', borderRadius: '4px' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}