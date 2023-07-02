const express = require('express')
const router = express.Router()

const {
    createTask,
    getAllTasks,
    deleteSingleTask,
    getSingleTask,
    updateSingleTask
} = require('../controller/task')

const {isAuthorized} = require('../middleware/isAuthorized')

router.route('/create-task').post(isAuthorized,createTask)
router.route('/get-tasks').get(isAuthorized,getAllTasks)
router.route('/delete-task').delete(isAuthorized,deleteSingleTask)
router.route('/get-single-task').post(isAuthorized,getSingleTask)
router.route('/update-task').patch(isAuthorized,updateSingleTask)


module.exports = router