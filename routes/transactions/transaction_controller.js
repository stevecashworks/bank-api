import transactions_model from "../../models/transactions.js";
import user_model from "../../models/user.js";
import createCustomError from '../../createCustomError.js'
import Transaction from  './transaction.js'
import  check_condition from "./transaction_logic/conditional.js"
import getUserDetails from "./transaction_logic/getUserDetails.js";
import verify_User from './transaction_logic/validateUser.js';

// gets all transactions (development mode only)

 export const get_all_transactions=async(req,res,next)=>{
    try {
        // I just use a  simple code as a form of fragile security 😂
        // I'll level up using jwt soon

        const {code}= req.body
        if(code===4464){
            const allTransactions=await transactions_model.find()
            res.status(200).json({success:true,result:allTransactions})
        }
        else{
            next(createCustomError("you're not authorized",403))
        }
    } catch (error) {
        next(createCustomError(error.message))
    }
 }
 // empty collection
 export const clearTransactions=async(req,res,next)=>{
   try {
     const {pass}=req.body
     if(pass===4464){
       await transactions_model.deleteMany()
         res.status(201).send("done")


     }
     else{
       next(createCustomError("Access denied",403))
     }
      
   } catch (error) {
     next(createCustomError(error.message))
   }
 }
 // get all transactions 
 
//  Define the rules for creating a new transaction
 export const new_Transaction=  async(req,res,next)=>{
      try {
        const {UserId,category,amount,transaction_type}=req.body
        // step 1 : Check if user exists
        const thisUser= await user_model.findById(UserId)
       const  userExists=   Boolean(thisUser)
        if(!userExists){
        return  next(createCustomError("User is invalid",404))
        } 
        

        else{

       const {balance}=thisUser
        console.log(balance)   
          // all transaction types using OOP  used for abstraction purposes
          const  thisTransaction= new Transaction(balance,{...req.body,UserId},res,next)
          thisTransaction[transaction_type]()
           //send alerts function coming soon
          
        }
      }
       catch (error) {
        next(createCustomError(error.message))
      }
 }
 export const confirm_transaction=async(req,res,next)=>{
      try{
       const User= await user_model.findById(req.body.UserId)
       if(!User){
         next(createCustomError("You are currently restricted , please try again"), 403)
       }else{
         const {balance}=User
        const thisTransaction=new Transaction(balance,req.body,res,next)
      
        thisTransaction.confirmSend()

       }
        
      }catch(error){
    console.log(error)
    res.end()      
      }
 }
 export const confirmSend=async(req,res,next)=>{
  try{
       const {UserId,destination,amount}= req.body
       const tokenId=req.user.id
      
      const userIsValid=check_condition(UserId==tokenId,"Error, user not authorized for    this transaction")
 
      const userDetails=await getUserDetails(UserId, "user")
      const recipientDetails=await getUserDetails(destination, "recipient's")
 
      const balanceIsSUfficient=check_condition(userDetails.balance>=amount,"You do not have sufficient funds ")
 
      const {firstName,lastName}= recipientDetails
      const {pin}=userDetails
      res.status(200).json({success:true, result:`are you sure you want to send ${amount} to ${firstName} ${lastName}? input pin to continue  `,pin:pin?pin:"none"})
      
    }
    catch(error){
      console.log(error.message)
      next(createCustomError(error.message))
    } 

 }
 // to change Pin
 export const changePin=async(req,res,next)=>{
  // validate user;
  try{
    const {UserId,newPin,oldPin}= req.body
    const userIsValid=verify_User(req)
    const user= await getUserDetails(UserId,"user")
    const previousPin= user.pin
    if(!previousPin){
     console.log(" no previous pin found ")
     const updatedUser=await user_model.findByIdAndUpdate(UserId,{$set:{pin:newPin}},{new:true})
      console.log(updatedUser)
     return res.status(200).json({success:true,result:updatedUser})
    }
    else{
     console.log("  previous pin found  user must provide former pin  to continue ")
      console.log(previousPin,oldPin)
     const canProceed =check_condition(oldPin===previousPin, "Incorrect pin, contact customer care if you can not remember your pin")
    console.log(canProceed)
    
    if(canProceed){
     const updatedUser= await user_model.findByIdAndUpdate(UserId,{$set:{pin:newPin}},{new:true})
     return res.status(200).json({success:true,result:updatedUser})
    }
  }
  
  } catch(error){
    next(createCustomError(error.message))
  }
  
 }
 export const transfer=async(req,res,next)=>{
  try{
    const {UserId,recipient,amount}=req.body
    const updatedUser= await user_model.findByIdAndUpdate(UserId,{$inc:{balance:(-1*amount)}},{new:true})
    const updatedRecipient= await user_model.findByIdAndUpdate(recipient,{$inc:{balance:(amount)}},{new:true})
    const thisTransaction= await transactions_model.create({...req.body})
    
  }
  catch(error){
    next(createCustomError(error.message))
  }
 }