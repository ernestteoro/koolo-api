const mongoose = require('mongoose');
const TaskModel = require('../model/task');


// method to get task for its owner
exports.get_task_for_owner =(req,res, next)=>{  
    TaskModel.find({owner:req.params._id }).populate("owner","_id firstName lastName email address gender istasker ").populate("tasker","_id firstName lastName email address gender istasker ").populate("service","_id name description ").exec(function(err,tasks){
        if(err){
            res.status(404).json({
                message:err.message
            });
        }else{ 
            res.status(200).json({
                count:tasks.length,
                tasks:tasks
            });
        }
    });
}

// method to get task for tasker
exports.get_task_for_tasker =(req,res, next)=>{
    const tasker=req.params._id;
    const ObjectId = mongoose.Types.ObjectId;

    TaskModel.find({tasker:tasker}).populate("owner","_id firstName lastName email address gender istasker ").populate("tasker","_id firstName lastName email address gender istasker ").populate("service","_id name description ").exec(function(err,tasks){
        if(err){
            res.status(404).json({
                message:err.message
            });
        }else{ 
            res.status(200).json({
                count:tasks.length,
                tasks:tasks
            });
        }
    });
}


// get all tasks or one task using its id
exports.get_task = (req, res, next) => {
    const taskId = req.params._id;
    if (taskId) {
        TaskModel.find({_id:taskId}).
        populate("owner","_id firstName lastName email address gender istasker ").
        populate("tasker","_id firstName lastName email address gender istasker ").
        populate("service","_id name description ").
        exec(function(err,tasks){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:tasks.length,
                    tasks:tasks
                });
            }
        });
    } else {
        TaskModel.find().
        populate("owner","_id firstName lastName email address gender istasker ").
        populate("tasker","_id firstName lastName email address gender istasker ").
        populate("service","_id name description ").
        exec(function(err,tasks){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:tasks.length,
                    tasks:tasks
                });
            }
        });
    }
}


// Method to add a task
exports.add_task=(req, res, next)=>{
    const task = new TaskModel({
        _id:new mongoose.Types.ObjectId(),
        description:req.body.description,
        owner:req.body.owner,
        ownerid:req.body.owner,
        service:req.body.service,
        tasker:req.body.tasker,
        taskerid:req.body.tasker,
        date:Date.now(),
        time:req.body.time,
        location:req.body.location
    });
    task.save().then(savedtask=>{
        res.status(200).json({
            task:savedtask,
            request:{
                type:'GET',
                url:'http://localhost:8080/tasks/'+savedtask._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a task
exports.update_task=(req, res, next)=>{

    const _id = req.params._id;
    const task ={
        description:req.body.description,
        tasker:req.body.tasker,
        date:req.body.date,
        time:req.body.time,
        location:req.body.location
    };
    TaskModel.update({_id:_id},task).then(updatedtask=>{
        task._id=_id;
        res.status(200).json({
            task:task
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a task
exports.delete_task=(req, res, next)=>{
    const _id = req.params._id;
    taskModel.deleteOne({_id:_id}).then(deletedtask=>{
        res.status(200).json({
            task:deletedtask,
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}