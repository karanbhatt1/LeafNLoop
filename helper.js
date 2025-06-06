


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

export async function registerCustomer(cust_name,cust_email,cust_password){
  const connection= await establishconnection();
      const query = `insert into customers (cust_name,cust_email,password_hash) value(?,?,?);`;
      let [res] = await connection.execute(query,[cust_name,cust_email,cust_password]);
      await connection.end();
      return res.insertId;
}

// NOTE adding to cart;
//REVIEW - THIS LINE NEEDS TO BE CHECKED AFTER ADDING JWT TOKENS;

export async function addtocart(user_id,product_id,quantity){
  const connection = await establishconnection();
  const cartquery =
    `INSERT INTO cart 
    (USER_ID,PRODUCT_NAME,QUANTITY,PRODUCT_URL) 
    VALUES (?,?,?) ON DUPLICATE KEY 
    UPDATE quantity= quantity+?`;
    let[res] = await connection.execute(cartquery,[user_id,product_id,quantity]);
    return res.insertId;
}
export async function fetchFromCart(user_id){
  const connection = await establishconnection();
  let query = `SELECT 
  product_name,product_url,description,quantity,price 
  from CART c join product p
  on c.product_id = p.product_id 
  where c.user_id = ? ORDER BY product_name ASC`;

  const res = await connection.execute(query);
  if(res !== undefined){
    return res;
  }
  throw new Error("could not find the produts");
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



export async function fetchProducts(){
  const connection = await establishconnection();
  const query = `SELECT * FROM product`;
  const [rows] = await connection.execute(query);
  if(rows.length > 0){
    return rows;
  }
  await connection.end();
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
