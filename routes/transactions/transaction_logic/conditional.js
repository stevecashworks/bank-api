 const check_condition=(condition,message)=>{
console.log(` condition: ${condition}`)
    
        if(!condition){
        
            throw new Error(message)
            
        }
        else{
            return true
        }
    
    
 }
 export default check_condition