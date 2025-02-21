
import express from "express";
import {dirname} from "path";
import bodyParser from "body-parser";
import { fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
app.use(express.static(__dirname+"Signin"));

app.use(bodyParser.urlencoded({extended:true}));
function isComingData(req,res,next){
  const data = req.body;
  console.log(data);
  next();


}

app.use(isComingData);
app.get("/",(req,res)=>{
  res.sendFile(__dirname +"/index.html");
})
app.post("/login",(req,res)=>{
  console.log(req.body);
});

app.listen(3000,()=>{
  console.log('listening on port 3000');
})