import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";
import { type } from "os";
import bcrypt from "bcrypt";
import {insertData,validateDetails,fetchData} from './helper.js';

if(insertData){
    console.log("came successfully");
}
const port = process.env.PORT || 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = bodyParser.urlencoded({extended:true});
app.use(parser);
app.use(express.json()); // for parsing the forms data;
app.use(express.static(path.join(__dirname ,"/public")))
app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

/**
 * Login section 
 */
app.get("/login",(req,res)=>{
    res.render("authentication/signin.ejs")
})

app.post("/login",(req,res)=>{
    const data = req.body;
    const email = data["email"];
    console.log({data});
    fetchData(email).then(resval=>{
        console.log(resval.charAt(9));
        if(resval.length===0){
            throw new Error("user not found");
        }
    }).catch(err=>{
        res.render("authentication/signin.ejs",{errorMessage:"No user found! Please create a new account."})
    }
    );
    
})

/**
 * sigiup section 
*/
app.get("/signup",(req,res)=>{
    res.render("authentication/sinup.ejs");
});
app.post("/signup",(req,res)=>{
    const data = req.body;
    console.log(data);
    // data checking done now push to the database if data  is correct;
    const pswdo= data.password;
    const name = data["name"];
    const email = data["email"];
    const contact = data["Contact"];
    const flag = validateDetails(pswdo,email,contact);
    
    if(flag===1){
        insertData(name,email,pswdo).then(function(resval){
            res.redirect("/");
        }).catch(function(error){
            console.error("error",error);
        })
    }else{
        res.render('authentication/sinup.ejs', { errorMessage: "Please enter correct details." });

    }

    // let hassedPass;
    // bcrypt.genSalt(10,function(err,Salt){
    //     bcrypt.hash(pass,Salt,(err,hash)=>{
    //         if(err){
    //             console.log(err.message);
    //         }
    //         hassedPass = hash;
    //         console.log(hassedPass);
    //     })
    //     bcrypt.compare(pass,hassedPass,async function(err,isMatch){
    //         if(isMatch){
    //             console.log("encrypted password is:",pass);
    //             console.log('decrypted password is:',hassedPass)
    //         }
    //         else{
    //             console.log(hassPass +' is not encryptoion of ' +pass);
    //         }
    //     })
    // });
    // console.log(hassPass);
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