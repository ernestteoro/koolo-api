const mongoose = require('mongoose');
const ProgramModel = require('../model/program');

// get all programs or one program using its id
exports.get_program = (req, res, next) => {
    const programId = req.params._id;
    if (programId) {
        ProgramModel.findOne({_id:programId}).
        populate("tasker","_id firstName lastName email address gender istasker ").
        exec(function(err,program){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json(program);
            }
        });
    } else {

        ProgramModel.find().
        populate("tasker","_id firstName lastName email address gender istasker ").
        exec(function(err,programs){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json(programs);
            }
        });
        
    }
}


// get programs done by a user using his id
exports.get_programs_of_user = (req, res, next) => {
    const userid = req.params._id;
    if (userid) {
        ProgramModel.find({tasker:userid}).populate("tasker","firstName lastName email address gender istasker").exec().then(programs=>{
            if(programs){
                res.status(200).json(programs);
            }else{
                res.status(404).
                json({
                     message:"No programs data found"
                });
            }
        }).catch(err=>{
            res.status(404).json({
                message:err.message
            });
        });
    } else {

        res.status(404).
        json({
             message:"No programs data found"
            });
    }
}

// Method to add a program
exports.add_program=(req, res, next)=>{

    // creating program object
    const program = new ProgramModel({
        _id:new mongoose.Types.ObjectId(),
        tasker:req.body.tasker,
        day:req.body.day,
        time:req.body.time,
        description:req.body.description
    });

    //Saving program
    program.save().then(savedprogram=>{
        res.status(200).json(savedprogram)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}

// Method to update a program
exports.update_program=(req, res, next)=>{
    const _id = req.params._id;
    const program ={
        programmethod:req.body.programmethod,
        amount:req.body.amount,
        description:req.body.description
    };
    ProgramModel.update({_id:_id},program).then(updatedprogram=>{
        res.status(200).json(updatedprogram)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a program
exports.delete_program=(req, res, next)=>{
    const _id = req.params._id;
    ProgramModel.deleteOne({_id:_id}).then(deletedprogram=>{
        res.status(200).json(deletedprogram)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}