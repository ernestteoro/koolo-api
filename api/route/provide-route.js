const express = require('express');
const provideController = require('../controller/provide-controller');
const authCheck = require('../midleware/check-auth');

// creating a route
const route = express.Router();

route.get('/',provideController.get_provide);
route.get('/:_id',provideController.get_provide);
route.get('/tasker/:_id',provideController.get_provide_by_tasker);
route.post('/',authCheck,provideController.add_provide);
route.patch('/:_id',authCheck,provideController.update_provide);
route.delete('/:_id',authCheck,provideController.delete_provide);


module.exports = route;