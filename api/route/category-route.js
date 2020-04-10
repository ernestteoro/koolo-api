const express = require('express');
const authCheck = require('../midleware/check-auth');
const categoryController  = require('../controller/category-controller');

// creating the router 
const route = express.Router();

route.get('/',categoryController.get_all_categories);
route.get('/:_id',categoryController.get_all_categories);
route.post('/',authCheck,categoryController.add_category);
route.patch('/',authCheck,categoryController.update_category);
route.delete('/',authCheck,categoryController.delete_category);


module.exports = route;