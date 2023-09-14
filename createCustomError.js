const createCustomError=(message,statusCode)=>{
    message= message||"Ooops something went wrong"
    statusCode=statusCode||500
      const error= new Error
      error.message=message
      error.statusCode=statusCode
      return error
}
export default createCustomError