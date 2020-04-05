const mongoose = require('mongoose');

const provideSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    tasker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
        require:true
    },
    price:{
        type:Number,
        require:true,
        match:/^\d{+}$/
    },
    /* This attribute shows frequency of paymenent(Hourly,daily,monthly etc..) */
    frequence:{
        type:String,
        require:true,
        default:'heure'
    },
    description:{
        type:String,
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    }

});


module.exports= mongoose.model('Provide',provideSchema);