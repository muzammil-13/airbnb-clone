const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const chatbotResponses = {
  'hello': 'Hi there! How can I help you with your travel plans?',
  'hi': 'Hello! Looking to book a stay?',
  'booking': 'To book a property, browse our listings and click "Book Now".',
  // Add more FAQ responses here
};

wss.on('connection', (ws) => {
  ws.send('Welcome! Ask me anything about bookings, stays or travel.');

  ws.on('message', (message) => {
    const userMessage = message.toString().toLowerCase();
    let response = chatbotResponses.default;
    
    Object.keys(chatbotResponses).forEach(key => {
      if (userMessage.includes(key)) {
        response = chatbotResponses[key];
      }
    });
    
    ws.send(response);
  });
});

server.listen(5000, () => {
  console.log('Chatbot server running on port 5000');
});
