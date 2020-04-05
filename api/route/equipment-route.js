const express = require('express');
const equipmentController = require('../controller/equipment-controller');
const authCheck = require('../midleware/check-auth');

const route = express.Router();


route.get('/',equipmentController.get_equipment);
route.get('/:_id',equipmentController.get_equipment);
route.post('/',authCheck,equipmentController.add_equipment);
route.patch('/:_id',authCheck,equipmentController.update_equipment);
route.delete('/:_id',authCheck,equipmentController.delete_equipment);


module.exports = route;