const express = require('express');
const reviewController = require('../controller/review-controller');
const authCheck = require('../midleware/check-auth');

const route = express.Router();


route.get('/',reviewController.get_review);
route.get('/:_id',reviewController.get_review);
route.get('/tasker/:_id',reviewController.get_user_reviews_for_tasker);
route.post('/',authCheck,reviewController.add_review);
route.patch('/:_id',reviewController.update_review);
route.delete('/:_id',reviewController.delete_review);


module.exports = route;