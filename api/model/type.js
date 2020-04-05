const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
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

module.exports= mongoose.model('Type',programSchema);