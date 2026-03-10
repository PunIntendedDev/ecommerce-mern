const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from header (just the token string, no "Bearer")
  const token = req.headers.authorization;
  
  console.log("Received token:", token ? "Token present" : "No token");

  if (!token) {
    return res.status(401).json("Not authorized - No token");
  }

  try {
    const decoded = jwt.verify(token, "secret");
    console.log("Decoded token:", decoded);
    req.userId = decoded.id; // Make sure this matches your JWT payload structure
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json("Invalid token");
  }
};

module.exports = verifyToken;