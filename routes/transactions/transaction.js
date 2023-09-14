import user_model from '../../models/user.js'
import transactions_model from '../../models/transactions.js'
import createCustomError from '../../createCustomError.js'
class Transaction{
    constructor(payload,res,next){
      
      this.payload=payload;
      this.amount=payload.amount;
      this.destination=payload.destination;
      this.res=res;
      this.next=next

    }
    async  getUserDetails(){
      const  {payload}=this
      const {UserId}=payload
      const {next,res}=this
      try{
        const thisUser=  await user_model.findById(UserId)
      return thisUser
      

      }catch(error){
        next(createCustomError(error.message))
      }
      
    }
    async deposit(){
        const {payload,amount,res,next}=this
      const  {UserId}=payload
        
      try {
          const thisUser=this.getUserDetails()
          console.log(thisUser)
          if(thisUser){

              await user_model.findByIdAndUpdate(UserId,{$inc:{balance:amount}})
              await  transactions_model.create(payload)
              res.status(200).json({success:true})
            }
      } catch (error) {
        next(createCustomError(error.message))
      }
      
    }
    //   checks if the User is valid and  asks for confirmation
     async confirmSend(){
         //  a user pin is required
        const {payload,amount,balance,res,next}=this
       try {
           // check balance
            if(balance<amount){
                next(createCustomError("Transaction failed due to nsufficient funds, try  checking our loan offers",403))
            }
            else{
                //check if recipent is a valid user
                const recipient=await user_model.findById(payload.destination);
                if(!recipient){
                    next(createCustomError("We could not find recipient's details, please check for errors  and try again"))
                }
                else{
                    const {firstName,lastName}=recipient
                   res.status(200).json({success:true,result:`Are you sure you want to send $${amount} to ${firstName} ${lastName} ?`})
                }

            }
       
        } catch (error) {
           next(createCustomError(error.message))
       } 
    }
    
    async send(){
      const {payload,amount,res,next}=this
        console.log(next)
      try {
         const  userDetails= await this.getUserDetails()
          // If we can't find the user in the database we send an error 
          console.log(userDetails)
          
          if(!userDetails){
            next(createCustomError("We  cannot process your account  informaton at the moment"))
 
          } 
          else{ 
              const {pin}=userDetails
              if(!pin){
                console.log("user has no pin")
                next(createCustomError('You do not have a pin set up on this account, set up security properly to proceed'))
              } else{
                console.log(`pin: ${pin}`)
              }

             
          }
       
        } 
        catch (error) {
         next(createCustomError(error.message))
       }
    }
  }
  export default Transaction