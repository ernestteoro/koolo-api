const mongoose = require('mongoose');
const provideModel = require('../model/provide');


// get all provides or one provide using its id
exports.get_provide = (req, res, next) => {
    const provideId = req.params._id;
    if (provideId) {
        provideModel.find({_id:provideId}).
        populate("tasker","_id firstName lastName email address gender istasker ").
        populate("service","_id name description ").
        exec(function(err,provide){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json(provide);
            }
        });
    } else {
        provideModel.find().
        populate("tasker","_id firstName lastName email address gender istasker ").
        populate("service","_id name description ").
        exec(function(err,provides){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json(provides);
            }
        });
        
    }
}

// get provides received by a tasker using his id
exports.get_provide_by_service = (req, res, next) => {
    const service_id = req.params._id;
    if (service_id) {
        provideModel.find({service:service_id}).
        populate("tasker","_id firstName lastName email address gender istasker ").
        populate("service","_id name description ").
        exec(function(err,provides){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 

                if(provides){
                    /*
                    var users=[];
                    provides.forEach(provide=>{
                        users.push(provide.tasker);
                    });
                    */

                    return res.status(200).json(provides);
                }else{
                    return res.status(404).json({
                        message:"No service provider data found"
                    })
                }
                
            }
        });
    } else {

        res.status(404).
        json({
             message:"No provides data found"
            });
    }
}


// get provides received by a tasker using his id
exports.get_provide_by_tasker = (req, res, next) => {
    const taskerid = req.params._id;
    if (taskerid) {
        provideModel.find({tasker:taskerid}).
        populate("tasker","_id firstName lastName email address gender istasker ").
        populate("service","_id name description ").
        exec(function(err,provides){
            if(err){
                return res.status(404).json({
                    message:err.message
                });
            }else{ 
                return res.status(200).json(provides);
            }
        });
    } else {

        return res.status(404).json({
             message:"No provides data found"
        });
    }
}


// Method to add a provide
exports.add_provide=(req, res, next)=>{
    // creating provide object
    const provide = new provideModel({
        _id:new mongoose.Types.ObjectId(),
        tasker:req.body.tasker,
        service:req.body.service,
        price:req.body.price,
        frequence:req.body.frequence,
        description:req.body.description
    });

    //Saving provides
    provide.save().then(savedprovide=>{
        return res.status(200).json(savedprovide)
    }).catch(err=>{
        return res.status(500).json({
            message:err.message
        });
    });

}

// Method to update a provide
exports.update_provide=(req, res, next)=>{
    const _id = req.params._id;
    const provide ={
        service:req.body.service,
        price:req.body.price,
        frequence:req.body.frequence,
        description:req.body.description
    };
    provideModel.update({_id:_id},provide).then(updatedprovide=>{
        res.status(200).json(updatedprovide)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a provide
exports.delete_provide=(req, res, next)=>{
    const _id = req.params._id;
    provideModel.deleteOne({_id:_id}).then(deletedprovide=>{
        res.status(200).json(deletedprovide)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}