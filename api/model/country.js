const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
});


module.exports=mongoose.model('countries',countrySchema);