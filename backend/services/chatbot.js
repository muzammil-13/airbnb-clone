const express = require('express');
const http = require('http');
const WebSocket = require('ws'); // WebSocket library

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // WebSocket server listens to HTTP server

const port = 5000;

// Sample FAQ data for matching
const faqData = {
  'what is your name?': 'I am your travel assistant bot.',
  'where can I go on vacation?': 'You can visit the beautiful destinations listed on our website.',
  'how can I book a tour?': 'Visit our booking page to select your desired destination and schedule.',
};

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established.');

  // Handle incoming messages from client
  ws.on('message', (message) => {
    console.log('Received:', message);
    const userMessage = message.toLowerCase();
    let reply = "Sorry, I didn't understand that.";

    // Match the user message with FAQs
    for (let question in faqData) {
      if (userMessage.includes(question)) {
        reply = faqData[question];
        break;
      }
    }

    // Send the reply back to the client
    ws.send(reply);
  });

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
