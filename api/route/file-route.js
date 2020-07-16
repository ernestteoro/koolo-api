const express = require('express');
const authCheck = require('../midleware/check-auth');
const userController = require('../controller/user-controller');
const uploads = require('../midleware/upload-file');

const route = express.Router();

console.log(route);
route.post('/upload',uploads.single('image'),checkAuth,userController.uploadUserProfilePicture)
