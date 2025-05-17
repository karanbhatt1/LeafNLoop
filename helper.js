


import sql from "mysql2/promise";
import env from "dotenv";
import bcrypt from "bcrypt";
env.config();

async function establishconnection(){
  const connection = await sql.createConnection({
  host: process.env.MYSQL_HOST ,
  user:  process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
return connection;
}

export async function insertData(cust_name,cust_email,cust_password){
  const connection= await establishconnection();
      const query = `insert into customers (cust_name,cust_email,password_hash) value(?,?,?);`;
      let [res] = await connection.execute(query,[cust_name,cust_email,cust_password]);
      await connection.end();
      return res.insertId;
}

export async function fetchData(cust_email){
  const connection = await establishconnection();
  const query = `select * from customers where cust_email=?`;
  const result = connection.execute(query,[cust_email]);
  if(result){
    return result;
  }
  return "some thing went wrong!"
}




export function validateDetails(pswdo,email,contact){
  let flag = 0;
  const passpat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%^&*!])[A-Za-z\d@$%^&*!]{8,}$/;
  const empat =/^[a-zA-Z0-9]+(?:[.%_+][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const conpat = /^[9876][0-9]{9}$/;
  if(passpat.test(pswdo) && empat.test(email) && conpat.test(contact)){
      flag=1
  }
  return flag;
}



export async function hasshedPass(paswdo){
  try{ 
    const hass = await bcrypt.hash(paswdo,13);
    return hass;
  } catch(err){
    console.error("hashing error",err);
    return undefined;
  }
}


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
