const mongoose = require('mongoose');
const ServiceModel = require('../model/service');

// get all services or one service using its id
exports.get_service = (req, res, next) => {
    const serviceId = req.params._id;
    if (serviceId) {
        ServiceModel
        .findById(serviceId)
        .select('_id name description created')
        .populate("subcategory","name description")
        .then(service => {
            return res.status(200).json(service);
        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                message: 'No user data found'
            });
        }); 
    } else {
        ServiceModel
        .find()
        .select('_id name description created')
        .populate("subcategory","name description")
        .then(services => {
            if (services) {
                return res.status(200).json(services);
            } else {
                return res.status(404).json({
                    message: 'No user data found'
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                message: err.message
            });
        });
    }
}



// get all services or one service using its id
exports.get_service_of_subcategory = (req, res, next) => {
    const subcategory_id = req.params._id;
    if (subcategory_id) {
        ServiceModel
        .find({subcategory:subcategory_id})
        .select('_id name description created')
        .populate("subcategory","name description")
        .then(services => {
            return res.status(200).json(services);
        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                message: 'No user data found'
            });
        }); 
    } else {
        ServiceModel.find()
        .select('_id name description created')
        .populate("subcategory","name description")
        .then(services => {
            if (services) {
                return res.status(200).json(services);
            } else {
                return res.status(404).json({
                    message: 'No user data found'
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a service
exports.add_service=(req, res, next)=>{
    const service = new ServiceModel({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        subcategory:req.body.subCategory._id
    });
    service.save().then(savedService=>{
        res.status(200).json(savedService)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a service
exports.update_service=(req, res, next)=>{

    const _id = req.params._id;
    const service ={
        name:req.body.name,
        description:req.body.description,
    };
    ServiceModel.update({_id:_id},service).then(updatedService=>{
        res.status(200).json(updatedService)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a service
exports.delete_service=(req, res, next)=>{
    const _id = req.params._id;
    ServiceModel.deleteOne({_id:_id}).then(deletedService=>{
        res.status(200).json(deletedService)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}