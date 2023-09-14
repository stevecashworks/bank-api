import Mongoose from 'mongoose';
 const userSchema= new Mongoose.Schema(
   {
    firstName:{
        type:String,
        required:true,
    },
    
    lastName:{
        type:String,
        required:true,
    },
    userImg:{
        type:String,
        default:"none"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    // initial balance is 0
    balance:{
        type:Number,
        default:0
    },
pin:{
    type:Number
    

},

transactions:{


    type :Mongoose.Schema.Types.ObjectId,
    ref:"transactions",


},
    notifications:{
      type: [
        {
            date:{type:Date, 
                default:()=>Date.now()
            },
            message:String
    }
    ],
    default:[]
},
// government id 
GovId:{
    type:String,
    default:"none"


}
}
    
)
export default  Mongoose.model("user",userSchema)
