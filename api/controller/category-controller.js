const mongoose = require('mongoose');
const CategoryModel = require('../model/category');


// function to get all categorys
exports.get_all_categories =(req,res,next)=>{
    const cat_id = req.params._id;
    if(cat_id){
        CategoryModel.findById(cat_id).select('_id name description created').exec().then(category=>{
            return res.status(200).json(category);
        }).catch(err=>{
            return res.status(404).json({
                message:err.message
            });
        });
    }else{
        CategoryModel.find().select('_id name description created').exec().then(categories=>{
            return res.status(200).json(categories);
        }).catch(err=>{
            return res.status(404).json({
                message:err.message
            })
        });
    }
}

// function to add an category
exports.add_category =(req,res,next)=>{
    const category = new CategoryModel({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description
    });
    category.save().then(category=>{
        res.status(200).json({
            country:savedcountry,
            request:{
                type:'GET',
                url:req.url+'/'+savedcountry._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}


// function to delete an category
exports.delete_category =(req,res,next)=>{
    const _idCat = req.params._id;
    if(_idCat){
        CategoryModel.deleteOne({_id:_idCat}).then(category=>{
            return res.status(200).json({
                message:'Category deleted with success',
                category: category
            });
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


// function to update an category
exports.update_category =(req,res,next)=>{
    if(req.body){
        const category = new CategoryModel({
            name:req.body.name,
            description:req.body.description
        });
        category.update({_id:req.body._id}).then(category=>{
            res.status(200).json({
                country:savedcountry,
                request:{
                    type:'GET',
                    url:req.url+'/'+savedcountry._id
                }
            });
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