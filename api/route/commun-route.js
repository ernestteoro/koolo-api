const express = require('express');
const communController = require('../controller/commun-controller');
const authCheck = require('../midleware/check-auth');

const route = express.Router();


route.get('/',communController.get_commun);
route.get('/:_id',communController.get_commun);
route.post('/',authCheck,communController.add_commun);
route.patch('/:_id',authCheck,communController.update_commun);
route.delete('/:_id',authCheck,communController.delete_commun);


module.exports= route;