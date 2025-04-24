import express from "express"
import bodyparser from "body-parser"
import path from "path"
import  {dirname} from "path";
import {fileURLToPath} from "url"
import { type } from "os";
import {imagesFromCloud as ifc} from '../cloudinary.js';

const app = express();
const port = process.env.PORT || 3000
 const __dirname = dirname(fileURLToPath((import.meta.url)));
//app.use(express.static())

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,"\\public\\css")))
app.use(express.static(path.join(__dirname,"\\public\\index.js")))
app.set("views engine","ejs")

app.get("/",(req,res)=>{
   const r = fi.ifc(1,"productAdded")
   console.log(r)
   res.render("index.ejs")
})

app.post("/added", (req, res) => {
       console.log(req.body);
       res.redirect("/")

  });
app.post("/removed",(req,res)=>{
    res.send("removed button working")
})

  app.listen(port, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`running on port ${port}`);
    }
  });
  