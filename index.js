function otpGenerator(n){
    var chotp = '';
    
    for(var i = 0;i<n;i++){
        var otp = Math.random()*10;
        otp = Math.floor(otp)+1;
        chotp += otp;
    }
    return chotp;
}
document.querySelector("img").classList.add("images_for_cart")