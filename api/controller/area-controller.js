const mongoose = require('mongoose');
const AreaModel = require('../model/area');

// get all areas or one area using its id
exports.get_area = (req, res, next) => {
    const areaId = req.params._id;
    if (areaId) {
        AreaModel.findById(areaId).select('_id name description created').populate('commun','country description').then(area => {
            return res.status(200).json(area);
        }).catch(err => {

            console.log(err);
            return res.status(404).json({
                message: 'No area data found with id'
            });
        });
    } else {
        AreaModel.find().select('_id name description created').populate('commun','name description').then(areas => {
            if (areas) {
                return res.status(200).json(areas);
            } else {
                return res.status(404).json({
                    message: 'No area data found'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a area
exports.add_area=(req, res, next)=>{
    const area = new AreaModel({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        commun:req.body.commun
    });
    area.save().then(savedarea=>{
        res.status(200).json(savedarea)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a area
exports.update_area=(req, res, next)=>{

    const _id = req.params._id;
    const area ={
        name:req.body.name,
        description:req.body.description,
    };
    AreaModel.update({_id:_id},area).then(updatedarea=>{
        area._id=_id;
        res.status(200).json(area)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a area
exports.delete_area=(req, res, next)=>{
    const _id = req.params._id;
    AreaModel.deleteOne({_id:_id}).then(deletedarea=>{
        res.status(200).json(deletedarea)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}