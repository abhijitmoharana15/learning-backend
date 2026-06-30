import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createConnection } from "mongoose";
import { ApiError } from "../utils/ApiError.js"; // importing api error file
import { User } from "../models/user.model.js";  // it is the modul which talk to db on behap of us // mean on behap of this we talk to db 
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

  //steps to user registation :-
  // 1. get user data from frontend
  // 2.validation -not empty
  // 3.check user alrady exist : userName and Email 
  // 4.check for Image,check for avatar
  // 5.upload them to cloudenary,checking avatar // because we put avtar as a mandatory or compulsory field 
  // 6.create user object  -create entry in db  
  // 7.remove password and refresh token field from response
  // 8.check for user creation  
  // 9.return response

  //form and json sa agar data aie to "req.body" ma mil jaiga agar url sa aa raha ha to different hota ha 

  //1. get user data from frontend
  const { fullName, email, username, password } = req.body
  console.log(email);
  //2.validation -not empty 
  if (fullName === "") {
    throw new ApiError(400, "full name is required")
  }

  if (email === "") {
    throw new ApiError(400, "emai is required")
  }

  if (username === "") {
    throw new ApiError(400, "username is required")
  }

  if (password === "") {
    throw new ApiError(400, "password is required")
  }

  //3.check user alrady exist : userName and Email

  const existedUser = User.findOne({  // User is referance of db or it talk to db and .findone it give the 1st match mean if email match it return if name match it return which match 1st it return
    $or: [{ username }, { email }]  // User check in mongo db that the username or email send by frontent and and store in db is same(any one of them is match ) then return true 
  })

  if (existedUser) {
    throw new ApiError(409, "user with email name or user name alrady exist ") // it is use to give error 
  }

  // 4.check for Image,check for avatar
  const avatarLocationPath = req.files?.avatar[0]?.path;  // ? -> is optional channing mean if it is wrong or give error you can throw it 
  const coverImageLocalPath = req.files?.coverImage[0]?.path;  // geting  local path of image and avatar from user and it should be store in localy in our system 
  if (!avatarLocationPath) {
    throw new ApiError(400, "Avatar is required ")  // checking avatar is uploaded in local file or not 
  }

  //5.upload them to cloudenary,checking avatarr

  const avatar = await uploadOnCloudinary(avatarLocationPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400, "avatar file is required")
  }

  // 6.create user object  -create entry in db 

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",  // if cover image is not given then put it empty 
    email,
    password,
    username: username.toLowerCase()
  })
  // if your db entry create successfully then mongodb create a id and attage with it 
  //7.remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"                                   // "-abc" mean it is not selected
  )
  // 8.check for user creation 
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user ")
  }
  //9.return response

  return res.status(201).json(
    new ApiResponse(200, createdUser, "user register successfully")
  )


})

export { registerUser }