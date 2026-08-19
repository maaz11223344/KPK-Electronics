import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db.js';
import { userView } from '../utils/dbHelpers.js';
import { signToken } from '../utils/token.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', async (req,res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message:'Name, email and password are required' });
    if (password.length < 6) return res.status(400).json({ message:'Password must be at least 6 characters' });
    const normalized = String(email).toLowerCase().trim();
    const existing = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [normalized]);
    if (existing[0]) return res.status(409).json({ message:'Email already registered' });
    const result = await query('INSERT INTO users (name,email,password,role,addresses) VALUES (?,?,?,?,?)', [name.trim(), normalized, await bcrypt.hash(password,12), 'customer', JSON.stringify([])]);
    const rows = await query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    const user = userView(rows[0]);
    res.status(201).json({ token: signToken(user), user });
  } catch(e) { res.status(500).json({ message:'Registration failed', error:e.message }); }
});

router.post('/login', async (req,res) => {
  try {
    const email = String(req.body.email || '').toLowerCase().trim();
    const rows = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    const userRow = rows[0];
    if (!userRow || !(await bcrypt.compare(req.body.password || '', userRow.password))) return res.status(401).json({ message:'Invalid email or password' });
    const user = userView(userRow);
    res.json({ token: signToken(user), user });
  } catch(e) { res.status(500).json({ message:'Login failed' }); }
});

router.get('/me', protect, (req,res) => res.json({ user:req.user }));
export default router;
