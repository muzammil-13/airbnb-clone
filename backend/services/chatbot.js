import { WebSocketServer } from 'ws';

const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    const chatbotResponses = {
        'hello': 'Hi there! How can I help you with your travel plans?',
        'hi': 'Hello! Looking to book a stay?',
        'booking': 'To book a property, browse our listings and click "Book Now".',
        'payment': 'We accept all major credit cards and PayPal for secure payments.',
        'cancel': 'You can cancel your booking up to 48 hours before check-in.',
        'location': 'We have properties available worldwide. Where are you planning to visit?',
        'price': 'Our prices vary by location and season. Use filters to find properties within your budget.',
        'default': 'I can help you with bookings, payments, cancellations, and general information.'
    };

    wss.on('connection', (ws) => {
        console.log('Client connected to chatbot');
        ws.send('Welcome! How can I help you with your travel plans today?');

        ws.on('message', (message) => {
            const response = chatbotResponses[message.toLowerCase()] || chatbotResponses['default'];
            ws.send(response);
        });

        ws.on('close', () => {
            console.log('Client disconnected from chatbot');
        });
    });
};

export default setupWebSocketServer;