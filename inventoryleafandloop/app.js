import express from "express"
import bodyparser from "body-parser"
import path from "path"
import  {dirname} from "path";
import {fileURLToPath} from "url"
import { type } from "os";
import {imagesFromCloud} from '../Cloudinary/cloudinary.js';
import {insertProduct, updateStock, removeProduct} from './database/configuration.js';




const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));
const port = process.env.PORT || 3000

//app.use(express.static())

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.set("view engine","ejs");

app.get("/",async (req,res)=>{
   //const r = ifc(1,"productAdded")
   //console.log(r)
   const images = await imagesFromCloud(10);
   res.render("index",{images:images});
})

app.post("/added", (req, res) => {
        console.log(req.body);
       const item ={
          itemID: req.body.ID,
          itemName: req.body.name,
          itemDescription: req.body.Description,
          itemPrice: parseInt(req.body.price),
          itemURL: req.body.product_url,
          itemStock: parseInt(req.body.quantity)
       }

        console.log("Item received:", item);
       if(item!== undefined){
          insertProduct(item["itemID"],item["itemName"],item["itemDescription"],item["itemPrice"],item["itemURL"],item["itemStock"])
          .then((result) => {
              console.log("Product added successfully:", result);
              res.redirect("/")
          })
          .catch((error) => {
              console.error("Error adding product:", error);
              res.status(500).send("product already added in inventory");
              res.redirect("/");
              return;
          });
       }

       // Here you would typically handle the addition logic, e.g., saving the item to a database or inventory
       

  });
app.post("/removed",(req,res)=>{
  console.log(req.body);
// Here you would typically handle the removal logic, e.g., removing an item from a database or inventory
    res.send("removed button working")
})

  app.listen(port, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`running on port ${port}`);
    }
  });
  