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


module.exports = router;
