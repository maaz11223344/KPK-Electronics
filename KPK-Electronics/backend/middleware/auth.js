import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { userView } from '../utils/dbHelpers.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required' });
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [payload.id]);
    if (!rows[0]) return res.status(401).json({ message: 'User not found' });
    req.user = userView(rows[0]);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
}
