const mongoose = require('mongoose');

const requiredequipementSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tasks',
        require:true
    },
    equipement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Equipements',
        require:true
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    }

});


module.exports= mongoose.model('Requiredequipement',requiredequipementSchema);