import 'dotenv/config';
import fs from 'fs/promises';
import mysql from 'mysql2/promise';

const host=process.env.DB_HOST||'127.0.0.1';
const port=Number(process.env.DB_PORT||3306);
const user=process.env.DB_USER||'root';
const password=process.env.DB_PASSWORD||'';
const db=process.env.DB_NAME||'kpk_electronics';

const connection=await mysql.createConnection({host,port,user,password,multipleStatements:true});
try{
  const schema=await fs.readFile(new URL('./schema.sql',import.meta.url),'utf8');
  await connection.query(schema);
  console.log(`MySQL database '${db}' and tables are ready.`);
}finally{await connection.end();}
