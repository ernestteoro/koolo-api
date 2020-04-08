const express = require('express');
const authCheck = require('../midleware/check-auth');
const userController = require('../controller/user-controller');

const route = express.Router();
//authCheck
route.get('/',userController.get_user);
route.get('/:_id',userController.get_user);

route.post('/signup',userController.add_user);

route.post('/login',userController.login);


module.exports=route;