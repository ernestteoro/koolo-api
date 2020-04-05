const mongoose = require('mongoose');

const communSchema = mongoose.Schema({
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
        default:Date.now()
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Countries',
        require:true
    }
});


module.exports=mongoose.model('Communs',communSchema);