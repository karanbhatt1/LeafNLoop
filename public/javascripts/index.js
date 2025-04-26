function signinTimer(){
   alert("Sigin for buying products");
}
setTimeout(signinTimer,5000);


const btns = document.querySelectorAll(".ct")
const cart = [];

btns.forEach(btnel=>(
   cart.push(btnel)
))