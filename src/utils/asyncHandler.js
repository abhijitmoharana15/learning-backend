const asyncHandler = (requestHandler)=>{
  (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
  }

}

export {asyncHandler}


// const asyncHandler = ()=>{} // passing one fxn inside it 
// const asyncHandler = (fun)=>{ ()=>{}}
// const asyncHandler = (fun)=> ()=>{} //same things because in single line there is no need of curly bracket 
// const asyncHandler = (fun)=>async()=>{} // to make this function async 



// const asyncHandler = (fn)=> (req,res,next) =>{
//     try{
//       await fn(req,res,next)

//     }
//     catch(error){
//       res.status(err.code || 500).json({
//         success:false,
//         message:err.message
//       })

//     }
// }   