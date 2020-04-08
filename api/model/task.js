const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    tasker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
        require:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    date:{
        type:Date,
        require:true,
    },
    time:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true,
        default:false
    },
    equipement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Equipement'
    },
    description:{
        type:String,
        require:true
    },
    created:{
        type:Date,
        default:Date.now()
    }

});


module.exports= mongoose.model('tasks',taskSchema);