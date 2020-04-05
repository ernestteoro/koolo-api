const express = require('express');
const paymentController = require('../controller/payment-controller');

// creating a route
const route = express.Router();

route.get('/',paymentController.get_payment);
route.get('/:_id',paymentController.get_payment);
route.get('/tasker/:_id',paymentController.get_payment_done_for_tasker);
route.get('/user/:_id',paymentController.get_payment_done_by_user);
route.post('/',paymentController.add_payment);
route.patch('/:_id',paymentController.update_payment);
route.delete('/:_id',paymentController.delete_payment);


module.exports = route;