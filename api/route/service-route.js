const express = require('express');
const serviceController = require('../controller/service-controller');
const authCheck = require('../midleware/check-auth');

const route = express.Router();


route.get('/',serviceController.get_service);
route.get('/:_id',serviceController.get_service);
route.post('/',authCheck,serviceController.add_service);
route.patch('/:_id',authCheck,serviceController.update_service);
route.delete('/:_id',authCheck,serviceController.delete_service);


module.exports= route;