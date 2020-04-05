const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    tasker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    description:{
        type:String,
        require:true
    },
    starts:{
        type:Number,
        require:true,
        match:/^\d+/
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    }

});


module.exports= mongoose.model('Review',reviewSchema);