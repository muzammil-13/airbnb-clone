require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/auth.routes');
const bodyParser = require('body-parser');
const http = require('http');
const setupWebSocketServer = require('./services/chatbot');

const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
setupWebSocketServer(server);

// Middleware setup in correct order
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

// MongoDB connection with proper error handling
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Server startup with proper port handling
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('WebSocket server is ready');
    console.log(`Client URL: ${process.env.CLIENT_URL}`);
});
