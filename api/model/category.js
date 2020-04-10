const mongoose = require('mongoose');

const categorySchema= mongoose.Schema({
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
    }
});


module.exports= mongoose.model("Category",categorySchema);