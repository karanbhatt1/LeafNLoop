// function signinTimer(){
//    alert("Sigin for buying products");
// }
// setTimeout(signinTimer,5000);


const btns = document.querySelectorAll(".ct");
 
let lcart=[];
function items(item,quantity){
   this.name = item.alt;
   this.item = item;
   this.quantity = quantity;
}


function existing(obj,img){
   exist = lcart.find(obj=>obj.name === img.alt);
   return exist;
}
let fre = {};
let product ={};
function event(btnel){
   btnel.addEventListener("click",function(){
      const img = btnel.parentElement.parentElement.firstElementChild.firstChild;
      fre[img.alt] = (fre[img.alt]||0)+1;
      product = new items(img,fre[img.alt]);
      const exist = existing(product,img);
      if(exist!== undefined){
         exist.quantity ++;
      }   
      else{
         lcart.push(product);
      }
      console.log(lcart)
   })
}
function getElement(){
   btns.forEach((btnel)=>{
      event(btnel);
   });
}

getElement();