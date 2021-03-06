const mongoose = require('mongoose');
const SubCategory = require('../model/subCategory');


// function to get all subcategorys
exports.get_all_subcategories =(req,res,next)=>{
    const cat_id = req.params._id;
    if(cat_id){
        SubCategory
        .findById(cat_id)
        .select('_id name description created')
        .populate("category","name description")
        .exec()
        .then(subcategories=>{
            return res.status(200).json(subcategories);
        }).catch(err=>{
            return res.status(404).json({
                message:err.message
            });
        });
    }else{
        SubCategory
        .find()
        .select('_id name description created')
        .populate("category","name description")
        .exec()
        .then(subcategories=>{
            return res.status(200).json(subcategories);
        }).catch(err=>{
            return res.status(404).json({
                message:err.message
            })
        });
    }
}

// function to add an subcategory
exports.add_subcategory =(req,res,next)=>{
    const subcategory = new SubCategory({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description
    });
    subcategory.save().then(subcategory=>{
        res.status(200).json(subcategory);
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}


// function to delete an subcategory
exports.delete_subcategory =(req,res,next)=>{
    const _idCat = req.params._id;
    if(_idCat){
        SubCategory.deleteOne({_id:_idCat}).then(subcategory=>{
            return res.status(200).json(subcategory);
        }).catch(error=>{
            return res.status(404).json({
                message:error.message
            });
        });
    }else{
        return res.status(500).json({
            message:'Internal server error'
        });
    }
}


// function to update an subcategory
exports.update_subcategory =(req,res,next)=>{
    if(req.body){
        const subcategory = new SubCategory({
            name:req.body.name,
            description:req.body.description
        });
        subcategory.update({_id:req.body._id}).then(subcategory=>{
            res.status(200).json(subcategory);
        }).catch(err=>{
            res.status(500).json({
                message:err.message
            });
        });
    }else{
        res.status(500).json({
            message:'Internal server error'
        });
    } 
}

// Method to fetch subcategories using category id
exports.get_all_subcategories_of_category=(req,res,next)=>{
    const _idCat = req.params._id;
    SubCategory
    .find({category:req.params._id})
    .select('_id name description created')
    .populate("category","name description")
    .exec()
    .then(subcategories=>{
        return res.status(200).json(subcategories);
    }).catch(err=>{
        return res.status(404).json({
            message:err.message
        })
    });
}

