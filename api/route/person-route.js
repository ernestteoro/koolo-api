const express = require('express');
const personController = require('../controller/person-controller');
const authCheck = require('../midleware/check-auth');

const router = express.Router();

router.get('/',authCheck,personController.get_persons);

router.post('/',personController.add_person);


module.exports=router;