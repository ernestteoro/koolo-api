const express = require('express');
const paymentMethodController = require('../controller/payment-method-controller');
const authCheck = require('../midleware/check-auth');

const route = express.Router();

route.get('/',paymentMethodController.get_paymentMethod);
route.get('/:_id',paymentMethodController.get_paymentMethod);
route.get('/user/:_id',paymentMethodController.get_user_paymentMethods);
route.post('/',paymentMethodController.add_paymentMethod);
route.patch('/:_id',paymentMethodController.update_paymentMethod);
route.delete('/:_id',paymentMethodController.delete_paymentMethod);


module.exports = route;