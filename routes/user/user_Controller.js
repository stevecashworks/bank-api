import user_Model from "../../models/user.js";

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
    console.log(req.body)
} catch (error) {
    next(error)
}
}

// register function ends