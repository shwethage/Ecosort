import React, { useState } from 'react';

export default function AddItemForm({ onItemAdded }) {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [disposalChannel, setDisposalChannel] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { itemName, category, estimatedValue: Number(estimatedValue), disposalChannel };

    try {
      const response = await fetch('http://ecosort-backend-ha85.onrender.com/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        alert('Item added successfully!');
        setItemName('');
        setCategory('');
        setEstimatedValue('');
        setDisposalChannel('');
        onItemAdded(); // Refresh the list
      }
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', background: '#f4f4f4', borderRadius: '8px', maxWidth: '400px' }}>
      <h3>Add New Waste Item</h3>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Category (e.g. Electronics)" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="number" placeholder="Estimated Value ($)" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Disposal Channel" value={disposalChannel} onChange={(e) => setDisposalChannel(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
      </div>
      <button type="submit" style={{ background: 'green', color: 'white', padding: '10px 15px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Add Item</button>
    </form>
  );
}