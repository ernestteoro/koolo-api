const express = require('express');
const taskController = require('../controller/task-controller');
const authCheck = require('../midleware/check-auth');


const route = express.Router();

route.get('/',taskController.get_task);
route.get('/:_id',taskController.get_task);
route.get('/:_id/owner',taskController.get_task_for_owner);
route.get('/:_id/tasker',taskController.get_task_for_tasker);
route.get('/:_id/service',taskController.get_task_of_service)
route.post('/',authCheck,taskController.add_task);
route.patch('/:_id',authCheck,taskController.update_task);
route.delete('/:_id',authCheck,taskController.delete_task);


module.exports= route;