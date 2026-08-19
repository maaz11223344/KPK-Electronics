import express from 'express';
import { query } from '../db.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { userView } from '../utils/dbHelpers.js';
const router=express.Router();router.use(protect,adminOnly);
router.get('/stats',async(_,res)=>{try{const [[products],[brands],[categories],[customers],[orders],[revenue]]=await Promise.all([query('SELECT COUNT(*) count FROM products WHERE active=1'),query('SELECT COUNT(*) count FROM brands WHERE active=1'),query('SELECT COUNT(*) count FROM categories WHERE active=1'),query("SELECT COUNT(*) count FROM users WHERE role='customer'"),query('SELECT COUNT(*) count FROM orders'),query("SELECT COALESCE(SUM(total),0) revenue FROM orders WHERE status <> 'cancelled'")]);res.json({products:Number(products.count),brands:Number(brands.count),categories:Number(categories.count),customers:Number(customers.count),orders:Number(orders.count),revenue:Number(revenue.revenue)});}catch(e){res.status(500).json({message:'Could not load dashboard stats',error:e.message})}});
router.get('/customers',async(_,res)=>{const rows=await query("SELECT * FROM users WHERE role='customer' ORDER BY created_at DESC LIMIT 200");res.json(rows.map(r=>userView(r)));});
export default router;
