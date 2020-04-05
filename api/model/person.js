const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true
    },
    zipcode:{
        type:Number,
        require:true,
        default:0000
    },
    gender:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }

});


module.exports= mongoose.model('Person',personSchema);