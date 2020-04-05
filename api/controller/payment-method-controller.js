const mongoose = require('mongoose');
const PaymentMethodModel = require('../model/payment-method');


// get payment means for a user

exports.get_user_paymentMethods = (req,res, next)=>{
    PaymentMethodModel.find({user:req.params._id}).
    select('_id title telephone description created').
    populate('user','firstName lastName email istasker isLogin').
    then(paymentMethods => {
        if (paymentMethods) {
            const response = {
                count: paymentMethods.length,
                paymentMethods: paymentMethods
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

// get all paymentMethods or one paymentMethod using its id
exports.get_paymentMethod = (req, res, next) => {
    const paymentMethodId = req.params._id;
    if (paymentMethodId) {
        PaymentMethodModel.findById(paymentMethodId).select('_id title telephone description created').populate('user','firstName lastName email istasker isLogin').then(paymentMethod => {
            return res.status(200).json({
                paymentMethod
            });
        }).catch(err => {
            return res.status(404).json({
                message: 'No user data found'
            });
        }); 
    } else {
        PaymentMethodModel.find().select('_id title telephone description created').populate('user','firstName lastName email istasker isLogin').then(paymentMethods => {
            if (paymentMethods) {
                const response = {
                    count: paymentMethods.length,
                    paymentMethods: paymentMethods
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


// Method to add a paymentMethod
exports.add_paymentMethod=(req, res, next)=>{
    const paymentMethod = new PaymentMethodModel({
        _id:new mongoose.Types.ObjectId(),
        user:req.body.user,
        title:req.body.title,
        description:req.body.description,
    });

    if(req.body.accountNumber){
        paymentMethod.accountNumber=req.body.accountNumber;
        paymentMethod.bankName= req.body.bankName;
    }

    if(req.body.telephone){
        paymentMethod.telephone=req.body.telephone;
    }

    if(req.body.cardNumber){
        paymentMethod.cardNumber = req.body.cardNumber;
        paymentMethod.cardcvv = req.body.cardcvv;
        paymentMethod.cardProvider = req.body.cardProvider;
    }

    paymentMethod.save().then(savedpaymentMethod=>{
        res.status(200).json({
            paymentMethod:savedpaymentMethod,
            request:{
                type:'GET',
                url:'http://localhost:8080/paymentMethods/'+savedpaymentMethod._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a paymentMethod
exports.update_paymentMethod=(req, res, next)=>{
    
    const _id = req.params._id;
    const paymentMethod ={
        title:req.body.title,
        description:req.body.description,
    };
    if(req.body.accountNumber){
        paymentMethod.accountNumber=req.body.accountNumber;
        paymentMethod.bankName= req.body.bankName;
    }

    if(req.body.telephone){
        paymentMethod.telephone=req.body.telephone;
    }

    if(req.body.cardNumber){
        paymentMethod.cardNumber = req.body.cardNumber;
        paymentMethod.cardcvv = req.body.cardcvv;
        paymentMethod.cardProvider = req.body.cardProvider;
    }
    
    PaymentMethodModel.update({_id:_id},paymentMethod).then(updatedpaymentMethod=>{
        res.status(200).json({
            paymentMethod:updatedpaymentMethod,
            request:{
                type:'GET',
                url:'http://localhost:8080/paymentMethods/'+updatedpaymentMethod._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a paymentMethod
exports.delete_paymentMethod=(req, res, next)=>{
    const _id = req.params._id;
    PaymentMethodModel.deleteOne({_id:_id}).then(deletedpaymentMethod=>{
        res.status(200).json({
            paymentMethod:deletedpaymentMethod,
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}