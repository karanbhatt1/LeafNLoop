const btn = document.querySelector("#add")

btn.addEventListener("click",(err)=>{
    if(err){
        fetch("/err")
    }
    if(btn.textContent=="Add to inventory"){
        fetch("/added")
        .then(response=>response.text())
        .then(data=>console.log(data))
    }
})
const btn2 = document.querySelector("#rmv")

btn2.addEventListener("click",()=>{
    if(btn2.textContent=="Remove From Inventory"){
        fetch("/removed")
        .then(response=>response.text("removed"))
    }
})
