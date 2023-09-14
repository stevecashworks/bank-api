import check_condition from "./conditional.js"
  const verify_User=(req)=>{
     try{
       const  tokenId= req.user.id;
       const {UserId}=req.body;
     return  check_condition(tokenId==UserId,"User is not permitted")
     }catch(error){
      throw new Error(error.message)
     }
  }
  export default verify_User