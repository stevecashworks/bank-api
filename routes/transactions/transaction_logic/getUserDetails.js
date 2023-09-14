import user_model from '../../../models/user.js'
 const getUserDetails=async(id, role)=>{
  try{
 const thisUser=await user_model.findById(id)
 if(!thisUser){
   throw new Error(`error  processing ${role} information `)
 }else{
    return  thisUser
 }
  }catch(error){
     throw new Error(error.message)
  }
}
export default getUserDetails