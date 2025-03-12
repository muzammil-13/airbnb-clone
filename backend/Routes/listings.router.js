const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing'); // Import your Listing model

// GET /api/listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find(); // Fetch all listings from the database
        res.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ... other routes for creating, updating, deleting listings could go here ...

// Add request validation and error boundaries
const validateListing = (req, res, next) => {
    const { title, price } = req.body;
    if (!title || !price) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    next();
};
router.post('/', validateListing, async (req, res) => {/*...*/});


module.exports = router;
