const express = require('express');
const countryController = require('../controller/country-controller');
const authCheck = require('../midleware/check-auth');

const route = express.Router();


route.get('/',countryController.get_country);
route.get('/:_id',countryController.get_country);
route.post('/',authCheck,countryController.add_country);
route.patch('/:_id',authCheck,countryController.update_country);
route.delete('/:_id',authCheck,countryController.delete_country);


module.exports= route;