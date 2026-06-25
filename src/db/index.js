import mongoose from "mongoose";
import {DB_NAME} from ".constants.js";

const connectDB = async ()=>{
  try{
     const connectionInstance = await mongoose.connect(`${process.env.mongodb_url}/${DB_NAME}`)
     console.log(`\n mongoDB connected !! DB HOST:${connectionInstance.Connection.host}`);
     
  } catch(error){
    console.log("mongoDB connection Error",error);
    process.exit(1)
    
  }
}

export default connectDB;