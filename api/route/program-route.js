const express = require('express');
const programController = require('../controller/program-controller');
const authCheck = require('../midleware/check-auth');

// creating a route
const route = express.Router();

route.get('/',programController.get_program);
route.get('/:_id',programController.get_program);
route.get('/user/:_id',programController.get_programs_of_user);
route.post('/',authCheck,programController.add_program);
route.patch('/:_id',authCheck,programController.update_program);
route.delete('/:_id',authCheck,programController.delete_program);


module.exports = route;