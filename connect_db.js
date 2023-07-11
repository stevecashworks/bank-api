import mongoose from 'mongoose';
const connect_Db =async(uri)=>{
    try {
        await mongoose.connect(uri)
        console.log('database connected successfully')
        
    } catch (error) {
        console.log(error)
    }

}
export default connect_Db