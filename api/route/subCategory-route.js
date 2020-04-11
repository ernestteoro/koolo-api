const express = require('express');
const authCheck = require('../midleware/check-auth');
const subCategoryController = require('../controller/subCategory-controller');

// Creating a route 
const route = express.Router();

route.get('/',subCategoryController.get_all_subcategories);
route.get('/:_id',subCategoryController.get_all_subcategories);
route.get('/category/:_id',subCategoryController.get_all_subcategories_of_category);
route.post('/',authCheck,subCategoryController.add_subcategory);
route.patch('/',authCheck,subCategoryController.update_subcategory);
route.delete('/',authCheck,subCategoryController.delete_subcategory);


module.exports = route;