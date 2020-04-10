const mongoose = require('mongoose')

const subCategorySchema= mongoose.Schema({
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
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:true
    }
    
});


module.exports = mongoose.model('Subcategory',subCategorySchema)