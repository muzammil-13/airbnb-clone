const router = require("express").Router(); 
const { register, login } = require("../controllers/auth.controller"); 

router.post("/register",register); 
router.post("/login",login);

// Add this temporary route to check existing users
router.get("/check-email/:email", async (req, res) => {
    try {
        const user = await User.findOne({ 
            email: { $regex: new RegExp(`^${req.params.email}$`, 'i') } 
        });
        res.json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ message: "Error checking email" });
    }
});
 
module.exports = router;

