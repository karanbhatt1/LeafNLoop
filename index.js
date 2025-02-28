import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";
import { type } from "os";
import sql from "mysql";
import {v2 as cloudinary} from "cloudinary";
import bcrypt from "bcrypt";

const port = process.env.PORT || 4000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = bodyParser.urlencoded({extended:true});
app.use(parser);
app.use(express.json()); // for parsing the forms data;
app.use(express.static(path.join(__dirname +"/public")))
app.set("views engine","ejs");

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/signup",(req,res)=>{
    const data = req.body;
    console.log(data);
    const pass = data.password;
    let hassedPass;
    bcrypt.genSalt(10,function(err,Salt){
        bcrypt.hash(pass,Salt,(err,hash)=>{
            if(err){
                console.log(err.message);
            }
            hassedPass = hash;
            console.log(hassedPass);
        })
        bcrypt.compare(pass,hassedPass,async function(err,isMatch){
            if(isMatch){
                console.log("encrypted password is:",pass);
                console.log('decrypted password is:',hassedPass)
            }
            else{
                console.log(hassPass +' is not encryptoion of ' +pass);
            }
        })
    });
    console.log(hassPass);
})

// addEventListener("click",()=>{
//     app.get("/Signup",(req,res)=>{
//         res.sendFile(__dirname+"/Signin/index.html");
//     })
// })
// app.use(express.static("public"));
app.listen(port,()=>{
    console.log(`page running on port ${port}`);
})
// function otpGenerator(n){
//     var chotp = '';
    
//     for(var i = 0;i<n;i++){
//         var otp = Math.random()*10;
//         otp = Math.floor(otp)+1;
//         chotp += otp;
//     }
//     return chotp;
// }

// ar.length;
// var a = document.getElementsByClassName("ct")[0].innerText;
// var item = document.getElementsByClassName("items")[0];
// var cart = document.querySelector(".nav-btn");
// var i = 1;
// cart.innerText = "Cart";
// function addedToCart(){
//     ar.push("item");
//     cart.innerText += i;  
//     i++;
// }