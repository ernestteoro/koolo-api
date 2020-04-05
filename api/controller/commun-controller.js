const mongoose = require('mongoose');
const CommunModel = require('../model/commun');

// get all communs or one commun using its id
exports.get_commun = (req, res, next) => {
    const communId = req.params._id;
    console.log(" Commun id == "+communId);

    if (communId) {
        CommunModel.findById(communId).select('_id name description created').populate('country','name description').then(commun => {
            return res.status(200).json({
                commun
            });
        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                message: 'No commun data found'
            });
        });
    } else {
        CommunModel.find().select('_id name description created').populate('country','name description').then(communs => {
            if (communs) {
                const response = {
                    count: communs.length,
                    communs: communs
                }
                return res.status(200).json({
                    response
                });
            } else {
                return res.status(404).json({
                    message: 'No commun data found'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a commun
exports.add_commun=(req, res, next)=>{
    const commun = new CommunModel({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        country:req.body.country
        //user:req.userData.userId
    });
    commun.save().then(savedcommun=>{
        res.status(200).json({
            commun:savedcommun,
            request:{
                type:'GET',
                url:'http://localhost:8080/communs/'+savedcommun._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a commun
exports.update_commun=(req, res, next)=>{

    const _id = req.params._id;
    const commun ={
        name:req.body.name,
        description:req.body.description,
    };
    CommunModel.update({_id:_id},commun).then(updatedcommun=>{
        commun._id=_id;
        res.status(200).json({
            commun:commun,
            request:{
                type:'GET',
                url:'http://localhost:8080/communs/'+commun._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a commun
exports.delete_commun=(req, res, next)=>{
    const _id = req.params._id;
    CommunModel.deleteOne({_id:_id}).then(deletedcommun=>{
        res.status(200).json({
            commun:deletedcommun,
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}