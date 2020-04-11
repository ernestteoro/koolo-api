const mongoose = require('mongoose');
const EquipmentModel = require('../model/equipment');

// get all equipments or one equipment using its id
exports.get_equipment = (req, res, next) => {
    const equipmentId = req.params._id;
    if (equipmentId) {
        EquipmentModel.findById(equipmentId).select('_id name description created').populate('createdby','email firstName lastName').then(equipment => {
            return res.status(200).json(equipment);
        }).catch(err => {
            return res.status(404).json({
                message: 'No equipment data found'
            });
        }); 
    } else {
        EquipmentModel.find().select('_id name description created').populate('createdby','email firstName lastName').then(equipments => {
            if (equipments) {
                return res.status(200).json(equipments);
            } else {
                return res.status(404).json({
                    message: 'No equipment data found'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a equipment
exports.add_equipment=(req, res, next)=>{
    const equipment = new EquipmentModel({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        createdby:req.userData.userId
    });
    equipment.save().then(savedequipment=>{
        res.status(200).json(savedequipment)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a equipment
exports.update_equipment=(req, res, next)=>{
    const _id = req.params._id;
    const equipment ={
        name:req.body.name,
        description:req.body.description,
    };
    EquipmentModel.update({_id:_id},equipment).then(updatedequipment=>{
        res.status(200).json(updatedequipment)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a equipment
exports.delete_equipment=(req, res, next)=>{
    const _id = req.params._id;
    EquipmentModel.deleteOne({_id:_id}).then(deletedequipment=>{
        res.status(200).json(deletedequipment)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}