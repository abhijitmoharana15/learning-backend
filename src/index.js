//require('dotenv').config({path:'./env'}) //use this or best methord is use below things
console.log(process.env.MONGODB_URI);
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path:'./env'
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server is running at port : ${process.env.PORT}`);
    
  })
})
.catch((error)=>{
  console.log("mongo db connection failed !!!!",error);
  
})