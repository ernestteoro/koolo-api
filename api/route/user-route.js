const express = require('express');
const authCheck = require('../midleware/check-auth');
const userController = require('../controller/user-controller');
const uploads = require('../midleware/upload-file');

const route = express.Router();

route.get('/',authCheck,userController.get_user);
route.get('/:_id',authCheck,userController.get_user);
route.get('/:_tasker/tasker',authCheck,userController.get_tasker_users);
route.patch('/update/',authCheck,userController.update_user);
route.patch('/update/service',authCheck,userController.update_user_service);
route.post('/signup',userController.add_user);
route.post('/login',userController.login);
route.post('/upload',uploads.single('image'),checkAuth,userController.uploadUserProfilePicture)

module.exports=route;
/*
  npm uninstall bcrypt
  sudo npm i bcrypt
  pm2 start server.js
  pm2 startup 
  pm2 save 
  pm2 list
*/