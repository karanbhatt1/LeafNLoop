// function signinTimer(){
//    alert("Sigin for buying products");
// }
// setTimeout(signinTimer,5000);


const btns = document.querySelectorAll(".ct");
 

function event(btnel){
   btnel.addEventListener("click",function(){
      const img = btnel.parentElement.parentElement.firstElementChild.firstChild;
      
      fetch('/addtocart',{
         method: 'POST',
         headers :{
            'Content-Type' : 'application/json'
         },
         body: JSON.stringify({user_id:us_id,product_id:img.pr_id,quantity:1})
      }).then(res=>res.json()).then(data=>{
         console.log(data);
      }).catch(error=>{
         console.log(error);
      })
   })
}

function getElement(){
   btns.forEach((btnel)=>{
      event(btnel);
   });
}

getElement();