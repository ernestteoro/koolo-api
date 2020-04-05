const express = require('express');
const areaController = require('../controller/area-controller');
const authCheck = require('../midleware/check-auth');


const route = express.Router();

route.get('/',areaController.get_area);
route.get('/:_id',areaController.get_area);
route.post('/',authCheck,areaController.add_area);
route.patch('/:_id',authCheck,areaController.update_area);
route.delete('/:_id',authCheck,areaController.delete_area);


module.exports= route;