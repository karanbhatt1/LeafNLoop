import sql from "mysql2";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: 'dpoy37daj', 
    api_key: '558537842595179',
    api_secret:'XsZTNVz4qGzww6kZqH7X9LrZZR0'
});
const db = sql.createConnection({
  host: 'localhost',  
  user: 'root',
  password: 'Project2@24',
  database: ''
});

db.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("connected to database");
})
cloudinary.api.resources(
    { type:'upload', prefix: 'Home/products/' },  // Replace with your folder name
    (error, result) => {
      if (error) return console.error(error);
      console.log(result.resources.map(img => img.public_id));
    const urls = result.resources.map(img => img.secure_url);
    console.log(urls);
    });
  
      