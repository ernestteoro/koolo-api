const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
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
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }

});


module.exports= mongoose.model('Service',serviceSchema);