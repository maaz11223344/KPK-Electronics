import express from 'express';
import { query, transaction } from '../db.js';
import { orderView, userView } from '../utils/dbHelpers.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router=express.Router();

async function getOrder(id, userId=null, admin=false){
  let sql=`SELECT o.*,u.id AS u_id,u.name AS u_name,u.email AS u_email,u.role AS u_role,u.phone AS u_phone,u.addresses AS u_addresses FROM orders o JOIN users u ON u.id=o.user_id WHERE o.id=?`;
  const params=[id]; if(!admin) { sql+=' AND o.user_id=?'; params.push(userId); }
  const order=(await query(sql,params))[0]; if(!order)return null;
  const items=await query('SELECT * FROM order_items WHERE order_id=? ORDER BY id ASC',[id]);
  return orderView(order,items,{id:order.u_id,name:order.u_name,email:order.u_email,role:order.u_role,phone:order.u_phone,addresses:order.u_addresses});
}

router.post('/',protect,async(req,res)=>{const {items,shipping}=req.body;if(!Array.isArray(items)||!items.length)return res.status(400).json({message:'Cart is empty'});try{const order=await transaction(async(conn)=>{let subtotal=0;const orderItems=[];for(const item of items){const [rows]=await conn.execute('SELECT * FROM products WHERE id=? AND active=1 FOR UPDATE',[item.product]);const p=rows[0];if(!p||p.stock<Number(item.quantity))throw new Error(`Insufficient stock for ${p?.name||'item'}`);const quantity=Number(item.quantity);subtotal+=Number(p.price)*quantity;const images=typeof p.images==='string'?JSON.parse(p.images):p.images;orderItems.push({productId:p.id,name:p.name,image:images?.[0]||'',price:Number(p.price),quantity});}const shippingFee=subtotal>=50000?0:2500;const [r]=await conn.execute('INSERT INTO orders (user_id,shipping_full_name,shipping_phone,shipping_address,shipping_city,shipping_province,shipping_postal_code,subtotal,shipping_fee,total,payment_method,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',[req.user._id,shipping?.fullName||null,shipping?.phone||null,shipping?.address||null,shipping?.city||null,shipping?.province||null,shipping?.postalCode||null,subtotal,shippingFee,subtotal+shippingFee,'cod','pending']);for(const i of orderItems){await conn.execute('INSERT INTO order_items (order_id,product_id,name,image,price,quantity) VALUES (?,?,?,?,?,?)',[r.insertId,i.productId,i.name,i.image,i.price,i.quantity]);await conn.execute('UPDATE products SET stock=stock-? WHERE id=?',[i.quantity,i.productId]);}return r.insertId;});res.status(201).json(await getOrder(order,req.user._id,true));}catch(e){res.status(400).json({message:'Order creation failed',error:e.message})}});
router.get('/mine',protect,async(req,res)=>res.json(await Promise.all((await query('SELECT id FROM orders WHERE user_id=? ORDER BY created_at DESC',[req.user._id])).map(x=>getOrder(x.id,req.user._id,false)))));
router.get('/:id',protect,async(req,res)=>{const o=await getOrder(req.params.id,req.user._id,req.user.role==='admin');if(!o)return res.status(404).json({message:'Order not found'});res.json(o)});
router.get('/',protect,adminOnly,async(req,res)=>{const ids=await query('SELECT id FROM orders ORDER BY created_at DESC LIMIT 200');res.json(await Promise.all(ids.map(x=>getOrder(x.id,null,true))));});
router.put('/:id/status',protect,adminOnly,async(req,res)=>{const allowed=['pending','confirmed','processing','shipped','delivered','cancelled'];if(!allowed.includes(req.body.status))return res.status(400).json({message:'Invalid order status'});await query('UPDATE orders SET status=? WHERE id=?',[req.body.status,req.params.id]);const o=await getOrder(req.params.id,null,true);if(!o)return res.status(404).json({message:'Order not found'});res.json(o)});
export default router;
