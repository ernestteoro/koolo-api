const mongoose = require('mongoose');
const PersonModel = require('../model/person');
const UserController = require('./user-controller');
const UserModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// add a person
exports.add_person=(req,res,next)=>{

    const reqUser = req.body.user;
    const personModel = new PersonModel({
        _id: new mongoose.Types.ObjectId(),
        firstName:req.body.firstName,
        lastName:req.body.lastName
    });
        if(reqUser){
            UserModel.findOne({
                username: reqUser.username
            }).exec().then(user => {
                if (!user) {
                    personModel.save().then((result) => {

                        bcrypt.hash(reqUser.password,10, (err, hashed) => {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Une erreur s\'est produite merci de ressayer'
                                })
                            }
                            if (hashed) {
                                const addUser = new UserModel({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: reqUser.username,
                                    password: hashed,
                                    person: result._id
                                });
                                addUser.save().then((savedUser) => {
                                    return res.status(200).json({
                                        message:'utilisateur cree avec sucess',
                                        user:{
                                            _id:savedUser._id,
                                            login:savedUser.username,
                                            prenom:result.firstName,
                                            nom:result.lastName
                                        },
                                        request:{
                                            type:'GET',
                                            url:'localhost:8080/users/'+savedUser._id
                                        }
                                    });
                                }).catch((err) => {
                                    console.log(err);
                                    return res.status(500).json({error:'Internal error occurred'});
                                });
                            }
                        });
                    }).catch((err) => {
                        console.log(err);
                        return res.status(500).json({error:err});
                    });

                } else {
                    return res.status(500).json({message:'L\' utilisateur exist dejà'});
                }
            }).catch(err=>{
                console.log(err);
                return res.status(500).json({error:'Internal error occurred'});
            });
        }else{
            personModel.save().then((result) => {
                return res.status(200).json({
                    message:'Personne creee avec sucess',
                    person:{
                        _id:result._id,
                        prenom:result.firstName,
                        nom:result.lastName
                    },
                    request:{
                        type:'GET',
                        url:'localhost:8080/persons/'+result._id
                    }
                });
            });
        }
}

// get on or all person
exports.get_persons=(req, res,next)=>{

}

// delete a person
exports.delete_person= (req,res, next)=>{

}

