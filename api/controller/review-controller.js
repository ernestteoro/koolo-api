const mongoose = require('mongoose');
const ReviewModel = require('../model/review');

// get all reviews or one review using its id
exports.get_review = (req, res, next) => {
    const reviewId = req.params._id;
    if (reviewId) {
        ReviewModel.
        find({_id:reviewId }).
        populate("user","_id firstName lastName email address gender istasker ").
        populate("tasker","_id firstName lastName email address gender istasker ").
        exec(function(err,review){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:review.length,
                    review:review
                });
            }
        });
    } else {
        ReviewModel.
        find().
        populate("user","_id firstName lastName email address gender istasker ").
        populate("tasker","_id firstName lastName email address gender istasker ").
        exec(function(err,reviews){
            if(err){
                res.status(404).json({
                    message:err.message
                });
            }else{ 
                res.status(200).json({
                    count:reviews.length,
                    reviews:reviews
                });
            }
        });
    }
}


// get all reviews or one review using its id
exports.get_user_reviews_for_tasker = (req, res, next) => {
    const tasker_id = req.params._id;
    if (tasker_id) {
        ReviewModel.find({tasker:tasker_id}).select('_id description starts created').populate('user','_id firstName lastName email address gender istasker').then(reviews => {
            return res.status(200).json({
                count:reviews.length,
                reviews:reviews
            });
        }).catch(err => {
            return res.status(404).json({
                message: 'No review data found for given tasker'
            });
        }); 
    } else {
        return res.status(404).json({
            message: 'Please provide a correct tasker'
        });
    }
}


// Method to add a review
exports.add_review=(req, res, next)=>{
    const review = new ReviewModel({
        _id:new mongoose.Types.ObjectId(),
        description:req.body.description,
        user:req.userData.userId,
        tasker:req.body.tasker,
        starts:req.body.starts,
    });
    review.save().then(savedreview=>{
        res.status(200).json({
            review:savedreview,
            request:{
                type:'GET',
                url:'http://localhost:8080/reviews/'+savedreview._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a review
exports.update_review=(req, res, next)=>{

    const _id = req.params._id;
    const review ={
        description:req.body.description,
        starts:req.body.starts,
    };
    reviewModel.update({_id:_id},review).then(updatedreview=>{
        res.status(200).json({
            review:updatedreview,
            request:{
                type:'GET',
                url:'http://localhost:8080/reviews/'+updatedreview._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a review
exports.delete_review=(req, res, next)=>{
    const _id = req.params._id;
    reviewModel.deleteOne({_id:_id}).then(deletedreview=>{
        res.status(200).json({
            review:deletedreview,
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}