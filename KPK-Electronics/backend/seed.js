import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { query, pool } from './db.js';

async function seed(){
  const email=(process.env.ADMIN_EMAIL||'admin@kpkelectronics.com').toLowerCase();
  const password=process.env.ADMIN_PASSWORD||'KPKAdmin@2026';
  const hash=await bcrypt.hash(password,12);
  await query(`INSERT INTO users (name,email,password,role,addresses) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name),password=VALUES(password),role='admin'`,['Store Administrator',email,hash,'admin',JSON.stringify([])]);
  await query(`INSERT INTO store_settings (setting_key,hero_subtitle) VALUES ('main',?) ON DUPLICATE KEY UPDATE setting_key=setting_key`,['Discover premium appliances from trusted brands, with transparent pricing and a shopping experience designed around your home.']);
  console.log('Admin account ready:',email);
  console.log('Password:',password);
  console.log('Store settings initialized.');
  console.log('Catalog is intentionally empty: create brands, categories and products from /admin.');
  await pool.end();
}
seed().catch(e=>{console.error(e);process.exit(1)});
