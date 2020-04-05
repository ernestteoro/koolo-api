const mongoose = require('mongoose');

const paymentmethodSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    telephone:{
        type:String, 
        match:/^\d{14}$/       
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    },
    description:{
        type:String,
        require:true
    },
    cardNumber:{
        type:Number,
        match:/^\d{16}$/
    },
    cardcvv:{
        type:Number,
        match:/^\d{3}/
    },
    cardProvider:{
        type:String
    },
    accountNumber:{
        type:Number,
        match:/^\d+$/
    },
    bankName:{
        type:String
    }
});

module.exports= mongoose.model('PaymentMethod',paymentmethodSchema);