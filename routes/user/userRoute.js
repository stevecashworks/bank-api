import express from 'express';
import {  get_All_Users,editUser, add_New_User, empty_users, log_User,get_Stats } from './user_Controller.js';
import { verify_Token } from './verifyToken.js';
const user_Router = express.Router();

// The Following binds my routes to their corresponding functions created  in the  "user_Controller.js" 

// Refer to  "./user_Controller.js" to make any changes or 🔧fix🔧 any bugs💦🛠🔧

 
// 🚪 Entry point 🚪 to this route fetches all users

user_Router.get('/',get_All_Users);

// ...

user_Router.post('/register',add_New_User)

// ...

//gets transaction History

user_Router.post('/stats/:id',get_Stats)

// ...

user_Router.post('/empty',empty_users)

// ...
user_Router.post('/login',log_User)
user_Router.post("/edit",verify_Token,editUser)


//  I should integrate jwt authentication once I have the dependency installed

export default user_Router
