const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.cookie;
  console.log(authHeader)

  if (authHeader) {
    const tokenString = authHeader.split(' ')[1];  // Extract token from "Bearer <token>"
    const token = tokenString.split('=')[1];
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // Attach decoded user data to req.user
      next();  // Proceed to the next middleware/controller
    } catch (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing" });
  }
};

module.exports = authenticateJWT;
