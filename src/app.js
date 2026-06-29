import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express()
//app.use(cors()) you can do only this but to do extar thing like origin sent mean from where you get the reques to do this we use below things

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))
app.use(express.json({limit:"16kb"})) //it is use to handel comes in json format and put a limit 16kb 

app.use(express.urlencoded({extended:true,limit:"16kb"})) // it is use to handel data come from url

app.use(express.static("public"))  //static stor the file,folder,image in their server , public is folder name wher you stor all things

app.use(cookieParser())  //use for cookies that come from frontend or from browser 


//routs import 

import userRouter from "./routes/user.routs.js"


// routs declaration 
  app.use("/api/v1/users",userRouter)



//http:localhost:8000/api/v1/users/register
export {app};