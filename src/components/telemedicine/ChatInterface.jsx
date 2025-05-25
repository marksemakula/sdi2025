import { useState } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatInterface = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello! How can I help you today?' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'patient', text: message }]);
      setMessage('');
      
      // Simulate doctor response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'doctor',
          text: 'Thank you for sharing. Let me review your symptoms...'
        }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Chat with Dr. Sarah</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'patient'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;