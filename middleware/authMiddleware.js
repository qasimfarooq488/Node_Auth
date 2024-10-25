const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Check if the token starts with 'Bearer ' and extract the actual token
  // like authorization: Bearer <token> we only want token//
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
