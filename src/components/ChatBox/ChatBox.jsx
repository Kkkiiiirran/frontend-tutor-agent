// ChatBox.jsx
import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const formatMessage = (text) => {
    //Replace **text** with <strong>text</strong> for bold formatting
    const bolded = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    //Replace newline characters with <br> to preserve line breaks in HTML rendering
    const formatted = bolded.replace(/\n/g, '<br>');
    return formatted;
  };

  // Sends the message to the backend API.
  // Receives the response and adds the agent's reply to the chat.
  // Handles errors by displaying an error message from the agent.
  const handleSend = async () => {
    if (input.trim() === '') return;
    setInput('');

    setMessages([...messages, { text: input, sender: 'user' }]);

    try {
      const response = await fetch('https://backend-tutor-agent-production.up.railway.app/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();

      setMessages(prev => [...prev, { text: data.answer, sender: 'agent' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Please try again..', sender: 'agent' }]);
    }


  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className='chat-container'>
      <div className='chat-header'>Tutor Agent</div>

      <div className='chat-messages'>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'agent'}`}
            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
          />
        ))}
      </div>

      <div className='chat-input-area'>
        <input
          type='text'
          placeholder='Ask your question...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
