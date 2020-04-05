const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    tasker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    day:{
        type:String,
    },
    time:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    }

});

module.exports= mongoose.model('Program',programSchema);