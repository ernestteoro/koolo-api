const express = require('express');
const authCheck = require('../midleware/check-auth');
const userController = require('../controller/user-controller');

const route = express.Router();

route.get('/',authCheck,userController.get_user);
route.get('/:_id',authCheck,userController.get_user);
route.get('/tasker/:_tasker',authCheck,userController.get_tasker_users);
route.post('/signup',userController.add_user);
route.post('/login',userController.login);


module.exports=route;