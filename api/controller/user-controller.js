const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../model/user');
const PersonModel = require('../model/person')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const db = require('../midleware/db')
//const ObjectId = require("mongodb").ObjectID;

//const dbName ="eservice"
//const collectionName ="users"


// get all users
exports.get_user = (req, res, next) => {
    const userId = req.params._id;
        if (userId) {
            UserModel.findById(userId)
            .select('_id firstName lastName email address zipcode gender istasker isLogin role')
            .populate("area","_id name description")
            .populate("service","_id name description ")
            .exec(function(err,user){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(user);
            });
        } else {
            UserModel.find().select('_id firstName lastName address email zipcode gender istasker isLogin role')
            .populate("area","_id name description")
            .populate("service","_id name description ")
            .exec(function(err,users){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(users);
            });
            /*
            .then(users => {
                if (users) {
                    return res.status(200).json(users);
                } else {
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
            }).catch(err => {
                return res.status(404).json({
                    message: err.message
                });
            });
            */
            
        }
}


// get all users that provide services
exports.get_tasker_users = (req, res, next) => {
    const _istasker = req.params._id;
        if (_istasker) {
            UserModel.find({istasker:_istasker})
            .select('_id firstName lastName email address zipcode gender istasker isLogin role')
            .populate("area","_id name description")
            .populate("service","_id name description ")
            .exec(function(err,user){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(user);
            });
            
            /*.then(user => {
                return res.status(200).json(user);
            }).catch(err => {
                return res.status(404).json({
                    message: 'No user data found'
                });
            });
            */
        } else {
            return res.status(404).json({
                message: 'No user data found'
            });
        }
}


// method to signup a user
exports.create_user = (userData) => {
    if (!userData) {
        return null;
    } else {

        db.initialize(dbName,collectionName,
            function(dbCollection){

                dbCollection.findOne({ email: userData.email},(err, user)=>{
                    if(err) {
                        return response.status(404).json({
                            message: error.message
                        });
                    }
                    if (!user) {
                        bcrypt.hash(userData.password,10, (err, result) => {
                            if (err) {
                                console.log(err);
                                return null;
                            }
                            if (result) {
                                userData={
                                    email:req.body.email,
                                    zipcode:req.body.zipcode,
                                    firstName:req.body.firstName,
                                    lastName:req.body.lastName,
                                    address:req.body.address,
                                    gender:req.body.gender,
                                    telephone:req.body.telephone,
                                    password:result,
                                    istasker:req.body.istasker
                                }
                                dbCollection.insert(userData, (error, user) => {
                                    if(error) {
                                        return response.status(500).json({
                                            message:error.message
                                        });
                                    }
                                    return res.status(404).json(user);
                                });
                            }
                        });
                    }else {
                        console.log("The user already exist");
                        return null;
                    }
                });
            },
            function(err){
                return res.status(404).json({
                    message: err.message
                });
            }
        );
    }
}

// add user
exports.add_user = (req, res, next) => {

    console.log("Request body ")
    console.log(req.body)

    UserModel.findOne({
        email: req.body.email
    }).exec().then(user => {
        if (!user) {
            bcrypt.hash(req.body.password,10, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message:err.message
                    });
                }
                if (result) {
                    const addUser = new UserModel({
                        _id: new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        zipcode:req.body.zipcode,
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        address:req.body.address,
                        gender:req.body.gender,
                        telephone:req.body.telephone,
                        password:result,
                        istasker:req.body.istasker,
                        area:req.body.area._id,
                        service:(req.body.service!=null)?req.body.service._id:null
                    });

                    addUser.save().then((savedUser) => {

                        UserModel.findById(savedUser._id)
                        .select('_id firstName lastName email address zipcode gender istasker isLogin role')
                        .populate("area","_id name description")
                        .populate("service","_id name description ")
                        .exec(function(err,user){
                            if(err){
                                return res.status(404).json({
                                     message: 'No user data found'
                                });
                            }
                            return res.status(200).json(user);
                        });
                        //return res.status(200).json();
                    }).catch((err) => {
                        return res.status(500).json({
                            message:err.message
                        });
                    });
                }
            });
        } else {
            return res.status(500).json({
                message:"The user already exists"
            });
        }
    });
    
}

// delete user
exports.delete_user = (req, res, next) => {

}

// User login
exports.login = (req, res, next) => {
    UserModel.findOne({
        email: req.body.email
    }).then(usr => {
        if (usr) {
            //const user = usr;
            console.log("User before hashing password")
            console.log(usr);
            bcrypt.compare(req.body.password, usr.password, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({
                        message: 'Not authorized'
                    });
                }
                if (result) {
                    console.log("User after hashing passwor")
                    console.log(usr)
                    token = jwt.sign({
                        username: usr.email,
                        userId: usr._id
                    }, 'secret', {
                        expiresIn: '1d'
                    });

                    const user={
                        email:usr.email,
                        role:usr.role,
                        token: token
                    }
                    return res.status(200).json(user);
                }

                return res.status(401).json({
                    message: 'Not authorized'
                }); 
            });
        }else{
            return res.status(404).json({
                message: "Not authorized"
            });
        }
    }).catch(err => {
        console.log(err)
        return res.status(404).json({
            message: "Not authorized"
        });
    })
    
}