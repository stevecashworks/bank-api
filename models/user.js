import mongoose from 'mongoose';
const userSchema= new mongoose.Schema(
   {
    firstName:{
        type:String,
        required:true,
    },
    
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
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
    transactions:{
       type: [
        {
            type:{enum:["withdrawal","transfer","deposit"]},
            by:{type:String, default :"Current user"},
            date:{type:Date, default:Date.now()},
        }
    ],
    default:[]
},

pin:{
    type:Number

},
    notifications:{
      type: [
        {
            date:{type:Date, default:Date.now()},
            message:String
    }
    ],
    default:[]
},
// government id 
GovId:{
    id_Type:String,

}
}
    
)
export default  mongoose.model("user",userSchema)