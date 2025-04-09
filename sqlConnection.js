import sql from "mysql2/promise";
import env from "dotenv";
env.config();
const db = sql;
const pool = db.createPool({
  host: process.env.MYSQL_HOST ,
  user:  process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports=pool;