
const {createTask,fetchTask,updateTask, deleteTask} = require('../Controllers/TaskController');


const router = require('express').Router();



router.get('/', fetchTask)
router.post('/',createTask);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);






module.exports = router;