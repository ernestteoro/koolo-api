const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../model/user');
const PersonModel = require('../model/person')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// get all users
exports.get_user = (req, res, next) => {
    const userId = req.params._id;
    if (userId) {
        PersonModel.findById(userId).select('_id firstName lastName address zipcode gender').populate('user','email istasker isLogin').then(user => {
            return res.status(200).json({
                user
            });
        }).catch(err => {
            return res.status(404).json({
                message: 'No user data found'
            });
        });
    } else {
        PersonModel.find().select('_id firstName lastName address zipcode gender').populate('user','email istasker isLogin').then(users => {
            if (users) {
                const response = {
                    count: users.length,
                    users: users
                }
                return res.status(200).json({
                    response
                });
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

// method to signup a user
exports.create_user = (userData) => {
    console.log("Inside create user");
    if (!userData) {
        return null;
    } else {
        var createUser=null;
        const user = UserModel.findOne({
            email: userData.email
        }).exec().then(user => {
            if (!user) {
                bcrypt.hash(userData.password,10, (err, result) => {
                    if (err) {
                        console.log(err);
                        return null;
                    }
                    if (result) {
                        const addUser = new UserModel({
                            _id: new mongoose.Types.ObjectId(),
                            username: userData.username,
                            password: result,
                            person: userData.person
                        });
                        addUser.save().then((savedUser) => {
                            console.log(savedUser);
                            return savedUser;
                        }).catch((err) => {
                            console.log(err);
                            return null;
                        });
                    }
                });
            } else {
                console.log("The user already exist");
                return null;
            }
        }).catch(err=>{
            console.log(err);
        });
        //return createUser;
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
                        return res.status(200).json({
                            user:savedUser,
                            request:{
                                type:'GET',
                                url:'localhost:8080/users/'+savedUser._id
                            }
                        });
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