import sql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function establishconnection() {
  const connection = await sql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD || " ",
    database: process.env.DATABASE,
  });
  return connection;
}

const a = await establishconnection();
if(await a){
   await console.log("Connection established successfully");
}

// insert a new product into the database
// REVIEW - This function is used to insert a new product into the database.
async function insertProduct(itemID,itemName,itemDescription,itemPrice,itemURL,itemStock) {
  const connection = await establishconnection();
  const query = `INSERT INTO product
  (product_id,
product_name,
description,
price,
product_url,
productstock) VALUES (?, ?, ?, ?, ?,?)`;

  const [result] = await connection.execute(query, [
    itemID,
    itemName,
    itemDescription, 
    itemPrice,
    itemURL,
    itemStock
  ]);
  console.log(result.affectedRows);
  await connection.end();
  
  // Check if the query was successful
  if(!result || result.affectedRows === 0) {
    throw new Error("Query execution failed");
  }
  return result.insertId;
}


// NOTE - This function is used to update the stock of a product in the database.
// NOTE - It takes the product ID and the new stock value as parameters.
async function updateStock(Itemid,newStock) {
  const connection = await establishconnection();
  const query = `UPDATE product SET productstock = ? WHERE product_id = ?`;
  
  const [result] = await connection.execute(query, [newStock, Itemid]);
  
  if(!result || result.affectedRows === 0) {
    throw new Error("Query execution failed or no rows updated");
  }
  
  console.log(`Stock updated for product ID ${Itemid}.`);
  await connection.end();

}


async function removeProduct(Itemid) {
  const connection = await establishconnection();
  const query = `DELETE FROM product WHERE product_id = ?`;
  
  const [result] = await connection.execute(query, [Itemid]);
  
  if(!result || result.affectedRows === 0) {
    throw new Error("Query execution failed or no rows deleted");
  }
  
  console.log(`Product with ID ${Itemid} removed successfully.`);
  await connection.end();
}


//NOTE - Exporting the functions to be used in other modules.
export { insertProduct, updateStock, removeProduct };