const mongoose = require('mongoose');
const PaymentModel = require('../model/payment');


// get all payments or one payment using its id
exports.get_payment = (req, res, next) => {
    const paymentId = req.params._id;
    if (paymentId) {

        PaymentModel.find({_id:paymentId}).select("_id amount description created").
        populate('user','_id firstName lastName email address gender istasker').
        populate('tasker','_id firstName lastName email address gender istasker').
        populate('task','date time location status description').
        exec(function(err,payment){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:payment.length,
                    payment:payment
                });
            }
        });
    } else {

        PaymentModel.find().select("_id amount description created").
        populate('user','_id firstName lastName email address gender istasker').
        populate('tasker','_id firstName lastName email address gender istasker').
        populate('task','_id date time location status description').
        populate('paymentmethod','title telephone description created').
        exec(function(err,payments){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:payments.length,
                    payments:payments
                });
            }
        });
        
    }
}


// get payments done by a user using his id
exports.get_payment_done_by_user = (req, res, next) => {
    const userid = req.params._id;
    if (userid) {
        PaymentModel.find({user:userid}).select("_id amount description created").
        populate('user','_id firstName lastName email address gender istasker').
        populate('tasker','_id firstName lastName email address gender istasker').
        populate('task','_id date time location status description').
        populate('paymentmethod','title telephone description created').
        exec(function(err,payments){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:payments.length,
                    payments:payments
                });
            }
        });
    } else {
        res.status(200).
        json({
             message:"No payments data found"
            });
    }
}



// get payments received by a tasker using his id
exports.get_payment_done_for_tasker = (req, res, next) => {
    const taskerid = req.params._id;
    if (taskerid) {
        PaymentModel.find({tasker:taskerid}).select("_id amount description created").
        populate('user','_id firstName lastName email address gender istasker').
        populate('tasker','_id firstName lastName email address gender istasker').
        populate('task','_id date time location status description').
        populate('paymentmethod','title telephone description created').
        exec(function(err,payments){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:payments.length,
                    payments:payments
                });
            }
        });
    } else {

        res.status(200).
        json({
             message:"No payments data found"
            });
    }
}


// Method to add a payment
exports.add_payment=(req, res, next)=>{

    // creating payment object
    const payment = new PaymentModel({
        _id:new mongoose.Types.ObjectId(),
        tasker:req.body.tasker,
        user:req.body.user,
        task:req.body.task,
        paymentmethod:req.body.paymentmethod,
        amount:req.body.amount,
        description:req.body.description
    });

    //Saving payment
    payment.save().then(savedpayment=>{
        res.status(200).json({
            payment:savedpayment,
            request:{
                type:'GET',
                url:'http://localhost:8080/payments/'+savedpayment._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}

// Method to update a payment
exports.update_payment=(req, res, next)=>{
    const _id = req.params._id;
    const payment ={
        paymentmethod:req.body.paymentmethod,
        amount:req.body.amount,
        description:req.body.description
    };
    PaymentModel.update({_id:_id},payment).then(updatedpayment=>{
        res.status(200).json({
            payment:updatedpayment,
            request:{
                type:'GET',
                url:'http://localhost:8080/payments/'+updatedpayment._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a payment
exports.delete_payment=(req, res, next)=>{
    const _id = req.params._id;
    PaymentModel.deleteOne({_id:_id}).then(deletedpayment=>{
        res.status(200).json({
            payment:deletedpayment,
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}