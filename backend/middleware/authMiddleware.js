import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  console.log("Received token:", token ? "Token present" : "No token");

  if (!token) {
    return res.status(401).json("Not authorized - No token");
  }

  try {
    const decoded = jwt.verify(token, "secret");
    console.log("Decoded token:", decoded);
    req.userId = decoded.id; 
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json("Invalid token");
  }
};

export default verifyToken;