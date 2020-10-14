const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        require:true,
        unique:true,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password:{
        type:String,
        require:true
    },
    isLogin:{
        type:Number,
        default:0
    },
    istasker:{
        type:Boolean,
        require:true,
        default:false
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    telephone:{
        type:String,
        require:true,
        match:/^\d{9}$/
    },
    gender:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        default:'user'
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
        require:false
    },
    area:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Areas',
        require:false
    },
    image:{
        type:String,
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    }
});


module.exports= mongoose.model('User',userSchema);