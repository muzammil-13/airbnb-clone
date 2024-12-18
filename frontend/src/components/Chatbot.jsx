import React, { useState, useEffect } from 'react';

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server (backend/services/chatbot.js)
    const socket = new WebSocket('ws://localhost:5000');
    setSocket(socket);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const botMessage = event.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botMessage },
      ]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close(); // Cleanup WebSocket on component unmount
    };
  }, []);

  const sendMessage = () => {
    if (socket && userInput.trim()) {
      // Send the user message to the WebSocket server
      socket.send(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput },
      ]);
      setUserInput('');
    }
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div id="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
