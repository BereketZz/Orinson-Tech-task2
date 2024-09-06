const express= require('express')
const {createTask,getTask, updateTask, deleteTask, stateTask}= require('../controllers/TaskController')
const auth= require('../middleware/auth')
const router= express.Router()


router.post('/create',auth,createTask)
router.get('/get',auth,getTask)
router.put('/update/:id',auth,updateTask)
router.delete('/delete/:id',auth,deleteTask)
router.get('/stat',auth,stateTask)





module.exports = router;
