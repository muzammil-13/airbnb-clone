const verifyAccessToken = require("../jwt").verifyAccessToken; 
const authenticateToken = (req,res,next)=>{ 
const authHeader = req.headers["authorization"]; 
const token = authHeader && authHeader.split(" ")[1]; 
if(!token){ 
return res.status(401).json({ message: "No token provided" }); 
} 
    const decodedToken = verifyAccessToken(token); 
    if(!decodedToken){ 
        return res.status(401).json({ message: "Invalid token" }); 
    } 
 
    req.userId = decodedToken.userId; 
    next(); 
} 
 
const authorizeRole = (roles)=>{ 
    return async (req,res,next)=>{ 
        try { 
            const user = await User.findById(req.userId); 
            if(!user || !roles.includes(user.role)){ 
                return res.status(403).json({ message: "Insufficient permissions" }); 
            } 
            next(); 
        } catch (error) { 
            res.status(500).json({ message: "Internal server error" }); 
        } 
    } 
} 
 
 
module.exports = { authenticateToken, authorizeRole };