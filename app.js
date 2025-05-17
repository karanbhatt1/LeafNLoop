import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { type } from "os";
import {insertData,validateDetails,fetchData} from './helper.js';
import { hasshedPass } from "./helper.js";
//import {getElement} from "./public/javascripts/index.js"


const port = process.env.PORT || 4000; 
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = bodyParser.urlencoded({extended:true});
app.use(parser);
app.use(express.json()); // NOTE ->for parsing the forms data;
app.use(express.static(path.join(__dirname ,"/public")))
app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.get("/",(req,res)=>{
    res.render("index.ejs");
})
let pasi;
async function handlepassword(paswdo){
  pasi = await hasshedPass(paswdo);
}
/**
 * Login section 
 */
app.get("/login",(req,res)=>{
    res.render("authentication/signin.ejs")
})

//FIXME - Login session need to be fixed;
app.post("/login",async (req,res)=>{
    let flag = 0;
    const data = req.body;
    const usremail = data["email"];
    const usrpaswd = data["password"];
    fetchData(usremail).then(resval=>{
        const [res] = resval[0];
        if(usremail === res["cust_email"] && bcrypt.compare(usrpaswd,res["password_hash"])){
            flag = 1;
            
        }
        else if(resval.length===0){
            throw new Error("user not found");
        }
    }).catch(err=>{
        console.log("error:",err)
        res.render("authentication/signin.ejs",{errorMessage:"No user found! Please create a new account."})
    }
    );
    console.log(flag);
    if(await flag===1){
        res.redirect("/");
    }
    
})



/**
 * sigiup section 
*/
app.get("/signup",(req,res)=>{
    res.render("authentication/sinup.ejs");
});
app.post("/signup",async (req,res)=>{
    const data = req.body;
    //NOTE data checking done now push to the database if data  is correct;
    const pswdo= data.password;
    const name = data["name"];
    const email = data["email"];
    const contact = data["Contact"];
    const flag = validateDetails(pswdo,email,contact);
    if(flag===1){
        await handlepassword(pswdo);
        insertData(name,email,pasi).then(function(resval){
            res.render("index.ejs",{userName:name,cust_email:email,cust_contact:contact});
            //NOTE successfully registered the user and now sending the data at front end for profile page;
        },function(error){
            console.error("error",error);
        })
    }else{
        res.render('authentication/sinup.ejs', { errorMessage: "Please enter correct details." });

    }
    });



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