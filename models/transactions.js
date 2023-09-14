import Mongoose from "mongoose"
const TransactionSchema= new Mongoose.Schema({
    UserId:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
        
    
                
    },
    category:{
        type:String,
        enum:["credit","debit"],
        required:true
    
    },
    date:{
        type:Date,
        default:()=> Date.now()
    },
    amount:{
        type:Number,
        required:true
    },
    transaction_type:{
        type:String,
        enum:["transfer","recieved","sent","deposit"],
        required:true
    
    },

    by:{ 
        type:String,
        default:"self"
    },
    destination:{
        type:String
        
    },
    desc:{
        type:String,
        default:"none" 
    
    },
    narration:{
        type:String,
        default:"none" 
    }


})
export default  Mongoose.model("transactions", TransactionSchema)