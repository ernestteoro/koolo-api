const mongoose = require('mongoose');


const areaSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    created:{
        type:Date,
        default:Date.now(),
        require:true
    },
    commun:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Commun',
        require:true
    }
});

module.exports = mongoose.model('Areas',areaSchema);