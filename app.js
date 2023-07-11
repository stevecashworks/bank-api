import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connect_Db from './connect_db.js';
import user_Router from './routes/user/userRoute.js';
dotenv.config()
const app = express()

const  api_Entry_Point="api/v3"
// Handle cross-platform origins
app.use(cors())

//Handle parsing and formatting to "json" format
app.use(express.json())

app.use(`${api_Entry_Point}/users`,user_Router)
const start_Server=async()=>{
    try {
        await connect_Db(process.env.mongo_uri)
        const port= process.env.PORT
        app.listen(port,()=>{console.log(`Server is listening on port: ${port}`)})
    } catch (error) {
       console.log(error) 
    }

}
start_Server()

