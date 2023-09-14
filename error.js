const handleError=(err,req,res,next)=>{
 try{
     res.status(err.statusCode).json({success:false,message:err.message,status:err.statusCode})
 }
 catch(error){

 }

}
export default handleError