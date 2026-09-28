import React, { useState } from 'react';

export default function EcoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 🌱 Ask me where to recycle any item (e.g., "batteries", "plastic bottle").' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let botReply = "That's a good question! Try checking local recycling guidelines or list it under general waste.";
      const query = userMsg.toLowerCase();

      if (query.includes('battery') || query.includes('phone') || query.includes('laptop')) {
        botReply = "⚠️ E-Waste detected! Drop this off at a certified Electronics recycling center.";
      } else if (query.includes('plastic') || query.includes('bottle')) {
        botReply = "♻️ Rinse and place this in your Plastics & Polymers recycling bin.";
      } else if (query.includes('pizza') || query.includes('food') || query.includes('organic')) {
        botReply = "🍎 Organic waste! This can go to composting or local green waste bins.";
      } else if (query.includes('glass')) {
        botReply = "🫙 Glass material! Handle with care and route to Glass recycling streams.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="ecobot-wrapper">
      {isOpen ? (
        <div className="ecobot-chat-window">
          <div className="ecobot-header">
            <span>🤖 EcoBot Assistant</span>
            <button onClick={() => setIsOpen(false)} className="ecobot-close-btn">×</button>
          </div>
          <div className="ecobot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`ecobot-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="ecobot-input-form">
            <input 
              type="text" 
              placeholder="Ask about an item..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="ecobot-fab">
          💬 EcoBot
        </button>
      )}
    </div>
  );
}