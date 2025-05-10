const usrpas = document.querySelector("#pason")
let len = document.querySelector(".length")
let upperCase = document.querySelector(".uppercase")
let lowerCase = document.querySelector(".lowercase")
let num = document.querySelector(".number")
let special = document.querySelector(".special")
let eml = document.querySelector(".em")
let emvalid = document.querySelector(".emvalid")
const nm = document.querySelector(".nm")
const contc = document.querySelector(".contc")
let convalid= document.querySelector(".convalid")



function validateName(name) {
    const p = /^[a-zA-Z' -]{5,15}$/;
    return p.test(name.trim());
}


let pattern=/^[9876][0-9]{9}/

contc.addEventListener("input",(e)=>{
    if(pattern.test(e.target.value) && contc.value.length==10){
        convalid.style.display="inline"
    }else{
        convalid.style.display="none"
    }
})

const em = /^[a-zA-Z0-9]+(?:[.%_+][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    eml.addEventListener("input",(e)=>{
        if(em.test(e.target.value)){
            emvalid.style.display="inline"
        }else{
            emvalid.style.display="none"
        }
    })


validateName(nm.value)
    usrpas.addEventListener("input", (e) => {
      let flag = 0;
      let pswdo = e.target.value;
      if (pswdo.length >= 8) {
        len.textContent = "✅";
        flag = 1;
      } else {
        len.textContent = "✔ At least 8 characters";
        flag = 0;
      }
      if (/[a-z]+/.test(pswdo)) {
        lowerCase.textContent = "✅";
        flag = 1;
      } else {
        lowerCase.textContent = "✔ At least one lowercase";
        flag = 0;
      }
      if (/[A-Z]+/.test(pswdo)) {
        upperCase.textContent = "✅";
        flag = 1;
      } else {
        upperCase.textContent = "✔ At least one Uppercase";
        flag = 0;
      }
      if (/[0-9]+/.test(pswdo)) {
        num.textContent = "✅";
        flag = 1;
      } else {
        num.textContent = "✔ At least one number";
        flag = 0;
      }
      if (/[!@_\-&^*$#]+/.test(pswdo)) {
        special.textContent = "✅";
        flag = 1;
      } else {
        special.textContent = "✔ At least one special character";
        flag = 0;
      }
      if (flag == 1) {
        console.log(1);
      }
      console.log(0);
    });
    
