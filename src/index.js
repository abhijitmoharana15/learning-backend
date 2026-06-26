//require('dotenv').config({path:'./env'}) //use this or best methord is use below things
console.log(process.env.MONGODB_URI);
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path:'./env'
})

connectDB();