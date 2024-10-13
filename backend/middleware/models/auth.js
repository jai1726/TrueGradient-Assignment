import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).json({ error: 'Invalid token. Please log in again.' });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access forbidden. Admins only.' });
  }
  next();
};

export default authMiddleware;
