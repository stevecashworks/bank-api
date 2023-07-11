import express from 'express';
import {  get_All_Users, add_New_User } from './user_Controller.js';
const user_Router = express.Router();

// The Following binds my routes to their corresponding functions created  in the  "user_Controller.js" 

// Refer to  "./user_Controller.js" to make any changes or 🔧fix🔧 any bugs💦🛠🔧

 
// 🚪 Entry point 🚪 to this route fetches all users

user_Router.get('/',get_All_Users);

// ...

user_Router.post('./register',add_New_User);


//  I should integrate jwt authentication once I have the dependency installed

export default user_Router
