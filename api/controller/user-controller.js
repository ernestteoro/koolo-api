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
            UserModel.findById(userId).select('_id firstName lastName email address zipcode gender istasker isLogin role').then(user => {
                return res.status(200).json(user);
            }).catch(err => {
                return res.status(404).json({
                    message: 'No user data found'
                });
            });
        } else {
            UserModel.find().select('_id firstName lastName address email zipcode gender istasker isLogin role').then(users => {
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
            
        }
}


// get all users that provide services
exports.get_tasker_users = (req, res, next) => {
    const _istasker = req.params._id;
        if (_istasker) {
            UserModel.find({istasker:_istasker}).select('_id firstName lastName email address zipcode gender istasker isLogin role').then(user => {
                return res.status(200).json(user);
            }).catch(err => {
                return res.status(404).json({
                    message: 'No user data found'
                });
            });
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
                        istasker:req.body.istasker
                    });
                    addUser.save().then((savedUser) => {
                        return res.status(200).json(savedUser);
                    }).catch((err) => {
                        return res.status(500).json({
                            message:err.message
                        });
                    });
                }
            });
        } else {
            console.log("The user already exist");
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

    /*
    db.initialize(dbName,collectionName,
        function(dbCollection){
            dbCollection.findOne({ email: req.body.email},(err, user)=>{
                if(err) {
                    return response.status(404).json({
                        message: error.message
                    });
                }
                if (user) {
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if (err) {
                            console.log(err)
                            return res.status(401).json({
                                message: err.message
                            })
                        }
                        if (result) {
                            token = jwt.sign({
                                username: user.email,
                                userId: user._id
                            }, 'secret', {
                                expiresIn: '1d'
                            });

                            return res.status(200).json({
                                email:user.email,
                                role:user.role,
                                token: token
                            });
                        }

                        return res.status(401).json({
                            message: 'Not authorized'
                        }); 
                    });
                }else{
                    return res.status(401).json({
                        message: "Not authorized"
                    });
                }
            });
        },function(err){
            return res.status(404).json({
                message: err.message
            });
        }
    );
    */

    
    UserModel.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({
                        message: 'Not authorized'
                    })
                }
                if (result) {
                    token = jwt.sign({
                        username: user.email,
                        userId: user._id
                    }, 'secret', {
                        expiresIn: '1d'
                    });

                    const user={
                        email:user.email,
                        role:user.role,
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