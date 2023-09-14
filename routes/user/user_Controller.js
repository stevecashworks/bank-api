import user_Model from "../../models/user.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
import createCustomError from '../../createCustomError.js'
// The "next" middleware will be handled shortly ...

// Get all Users in Database

export const get_All_Users=async(req,res,next)=>{
    try { 
        const  all_Users= await user_Model.find()
         console.log(all_Users)
         res.status(200).json({success:true, result:all_Users})
    } catch (error) {
        next(error)
    }
}
// get_all_users end

//   Adds a new user to the Database

export const add_New_User=async(req,res,next)=>{
try {
    const newUser=   await user_Model.create(req.body)
    const accessToken= await jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.jwt_pass)
    res.status(200).json({success:true,result:{...newUser._doc,accessToken}})


} catch (error) {
    next(createCustomError(error.message))
}
}
// register function ends

// Now let's handle logging in a user 


export const log_User = async(req,res,next)=>{
    try{
        const {email,password}=req.body
        const thisUser= await user_Model.findOne({email})
        if(thisUser==null){
      return     next(createCustomError(`There is no user registered with email: ${email}`,404))
        }
        else{
            if(thisUser.password!==password){
           return next(createCustomError(`Authentication failed because  password is not correct please note that passwords are case-sensitive`,403)) 
            

            }
            else{
                const {password,...others}= thisUser._doc
                 const {_id}=others
                const newUserDetails=await user_Model.aggregate([
                     {
                         $match:{_id}
                     },
                     {
                         $lookup:{
                             from:"transactions",
                             localField:"_id",
                             foreignField:"UserId",
                             as:"transactions"

                         }
                     }
                 ])
                 console.log("user-details: ",newUserDetails)
                 console.log(newUserDetails[0].transactions);
                 const accessToken= await jwt.sign({id:newUserDetails._id,isAdmin:newUserDetails.isAdmin},process.env.jwt_pass)
                 

                res.status(200).json({success:true,result:{...others,accessToken}})
            }
        }

    }
    catch(error){
        next(createCustomError(error.message))
    }
 }
export const get_Stats= async(req,res,next)=>{
    const {id}=req.params
      const date= new Date()
      const month=date.getMonth()
      
      const monthsArray=[]
      console.log(month)
      for(let i=1; i<6; i++ ){
          const currentDate= new Date();
          
            currentDate.setMonth(month-i)
            const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]

          monthsArray.push(months[currentDate.getMonth()])  
        }
        console.log(monthsArray)
        res.end()
}
// warning, clear_database Functions  should be deleted after development is complete
  export const  empty_users=async(req,res,next)=>{
   
      try{
        const {id}=req.body
        if(id===4464){
            await user_Model.deleteMany()
            res.status(200).send("done")
        }
        else{
            res.status(403).send("You're not authorized")

        }
    }
    catch(error){
        next(error)
    }
  }

  export const editUser=async(req,res, next)=>{
    try{
        const userId= req.user.id
        const updatedUser=await user_Model.findByIdAndUpdate(userId,{$set:req.body},{new:true})
        
        return res.status(200).json(updatedUser)
    }catch(error){
        next(createCustomError(error.message))
    }
  }