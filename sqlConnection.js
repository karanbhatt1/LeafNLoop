


import sql from "mysql2/promise";
import env from "dotenv";
env.config();

const connection = await sql.createConnection({
  host: process.env.MYSQL_HOST ,
  user:  process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
module.exports=connection;

/// _--------------------------------------- PERFORMING CRUD OPERATIONS ----------------------------------------------------------------------------

//await pool.execute("select * from customer");
// while using promises we use await and async;



//console.log(await pool.execute("select * from customers"))

//  INSERT OPERATIONS 

//      using prepated statements for inserting records (Best Practice);
// const res = await pool.execute(`insert into customers(cust_id,cust_name,cust_email,password_hash,isActive) values(?,?,?,?,?)`, [])// sql query , array of data.
// // const res = await pool.execute("insert into customers(cust_id,cust_name,cust_email,password_hash,isActive) values(2,'karan','xz@gmail.com','56kshsk252w3431',true)")
// // const values = [[],[]] // for adding the multiple value in insert query;
// // For multiple query db.query(sql,[]);
// // if(res){
// //   console.log("successfully inserted  the data");
// // }

// // FETCHING DATA FROM SQL.

// const [[row]] = await pool.execute("select * from customers")

// console.log()

// OUTPUT IS ARRAY OF ARRAY HAVING THE DATA IN FIRST ARRAY AND SECOND IS THE SCHEMA OF THE TABLE.


// update table set col = val where email = ' ' ;\


// inside try {
// }catch
// delete  from tabe name where cond.

//PROPERTIES OF SELECT STATEMENTS.
