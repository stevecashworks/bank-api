import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const verify_Token=async(req,res,next)=>{
    const token=req.headers.token1;
    const jwt_pass=process.env.jwt_pass
    
    
 const data=jwt.verify(token,jwt_pass,(err,data)=>{
     if(err){
          console.log(err.message)
          res.status(500).json({success:false,result:err.message})
     }else{
         req.user=data
         next()
     }
 })
}