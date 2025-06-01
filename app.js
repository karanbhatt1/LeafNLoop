import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { type } from "os";
import { registerCustomer, validateDetails, fetchData , fetchProducts } from "./helper.js";
import { hasshedPass } from "./helper.js";
import {addtocart} from "./helper.js";
import { error } from "console";
import session  from "express-session";
//import {getElement} from "./public/javascripts/index.js"

const port = process.env.PORT || 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = bodyParser.urlencoded({ extended: true });
app.use(parser);
app.use(express.json()); // NOTE ->for parsing the forms data;
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
  secret:"viryainchut",
  resave:false,
  saveUninitialized:false,
  cookie:{secure:false}
}));
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  fetchProducts().then((products) => {

    res.render("index.ejs", { products: products });
  }).catch((err)=>{
    res.send("it's not you its us.\n Hang on!!")
  });
});
let pasi;
async function handlepassword(paswdo) {
  pasi = await hasshedPass(paswdo);
}
/**
 * Login section
 */
app.get("/login", (req, res) => {
  res.render("authentication/signin.ejs");
});

//FIXME - Login session need to be fixed;
app.post("/login", async (req, res) => {
  let flag = 1;
  const data = req.body;
  const usremail = data["email"];
  const usrpaswd = data["password"];
  //flag = await bcrypt.compare(usrpaswd, ["password_hash"]);
  const [dat] = await fetchData(usremail)
  const passohaso = dat[0]["password_hash"];
  const usro = dat[0]["cust_email"];
  flag = await bcrypt.compare(usrpaswd,passohaso);
  if(flag && usremail === usro){
    req.session.message = "Successfully logged in!!"
    res.redirect("/");
  }else{
    res.render("authentication\\signin.ejs",{errorMessage:"incorrect email or password"})
  }
});

/**
 * sigiup section
 */
app.get("/signup", (req, res) => {
  res.render("authentication/sinup.ejs");
});


app.post("/signup", async (req, res) => {
  const data = req.body;
  //NOTE data checking done now push to the database if data  is correct;
  const pswdo = data.password;
  const name = data["name"];
  const email = data["email"];
  const contact = data["Contact"];
  const flag = validateDetails(pswdo, email, contact);
  console.log(flag);
  if (flag === 1) {
    await handlepassword(pswdo);
    registerCustomer(name, email, pasi).then(
      function (resval) {
        console.log("hum aagye");
        res.redirect("/") 
        // {
        //   userName: name,
        //   cust_email: email,
        //   cust_contact: contact,
        // });
        // //NOTE successfully registered the user and now sending the data at front end for profile page;
      },
      function (error) {
        console.error("error", error);

        res.render("authentication/signup",{errorMessage:"No user found!!"});
      }
    );
  } else {
    res.render("authentication/sinup.ejs", {
      errorMessage: "Please enter correct details.",
    });
  }
});

// NOTE - CART GETTING DATA FROM FRONTEND USING FETCH IN
// LINK - addtocart

app.post("/addtocart", function (req, res) {
  const data = req.body;
  console.log(data);
  
});
app.listen(port, () => {
  console.log(`page running on port ${port}`);
});
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
