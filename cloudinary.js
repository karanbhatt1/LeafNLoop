import {v2 as cd} from "cloudinary"
import env from "dotenv"
env.config();

const a = cd.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure:true
});

if(a){
    console.log(a.cloud_name)
    console.log("connected using api");
}

function imagesFromCloud(maxResult , folder='productsAdded'){

    return new Promise((resolve,reject) =>{
    cd.api.resources({ type: 'upload', max_results:`${maxResult}`, prefix:`${folder}`}, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result.resources.map(image=>({
        public_id: image.public_id,
        secure_url: image.secure_url
      })));
        
      }
    })});
}

module.exports=imagesFromCloud;
// module.exports= {imagesFromCloud};
// async function fetchImagesFromFolder(folderName){
//     try{
//         const result = await cd.api.resources({
//             type:"upload",
//             prefix: folderName,
//             resource_type:"image",
//             max_results:1
//         });
//     return result.resources.map(img=>({
//         public_id:img.public_id,
//         url: img.secure_url,
//         format:img.format,
//         width: img.width,
//         height:img.height,
//         created_at: img.created_at
//     }));} catch(error){
//         console.error(error);
//         return [];
//     }
// }
//const arr = fetchImagesFromFolder("productsAdded")
//console.log(arr);
