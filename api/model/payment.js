const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    tasker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
        require:true
    },
    paymentmethod:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PaymentMethod',
        require:true
    },
    amount:{
        type:Number,
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

});

module.exports= mongoose.model('Payments',paymentSchema);