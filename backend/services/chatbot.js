const express = require('express');
const http = require('http');
const WebSocket = require('ws'); // WebSocket library

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // WebSocket server listens to HTTP server

const port = 5000;

// Sample FAQ data for matching
const chatbotResponses = {
  'hello': 'Hi there! How can I help you with your travel plans?',
  'hi': 'Hello! Looking to book a stay?',
  'booking': 'To book a property, browse our listings and click "Book Now" on your chosen accommodation.',
  'payment': 'We accept all major credit cards and PayPal for secure payments.',
  'cancel': 'You can cancel your booking up to 48 hours before check-in through your account dashboard.',
  'location': 'We have properties available worldwide. Where are you planning to visit?',
  'price': 'Our prices vary by location and season. You can use filters to find properties within your budget.',
  'check in': 'Standard check-in time is 3 PM. Early check-in may be available upon request.',
  'check out': 'Check-out time is 11 AM. Late check-out can be arranged with the host.',
  'default': 'I can help you with bookings, payments, cancellations, and general information. What would you like to know?'
};

const processMessage = (message) => {
  const lowercaseMsg = message.toLowerCase();
  let response = chatbotResponses.default;

  Object.keys(chatbotResponses).forEach(key => {
      if (lowercaseMsg.includes(key)) {
          response = chatbotResponses[key];
      }
  });

  return response;
};

wss.on('connection', (ws) => {
  ws.send('Welcome to our travel assistant! How can I help you today?');

  ws.on('message', (message) => {
      const userMessage = message.toString().toLowerCase();
      const response = processMessage(userMessage);
      ws.send(response);
  });

    console.log('Sending reply to user:', reply); // Log sent reply
    // Send the reply back to the client
    ws.send(reply);
  

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

});


// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
