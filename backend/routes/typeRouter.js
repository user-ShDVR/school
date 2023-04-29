const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')
const tasksController = require('../controllers/tasksController')

router.post('/task', checkRole('ADMIN'), tasksController.create) //
router.get('/get_all_task', tasksController.getAll)
router.post('/task_add_like',  checkRole('EXPERT'), tasksController.add_like)
router.post('/get_like_task', tasksController.get_like)
router.post('/add_user_in_task', tasksController.add_user)


router.post('/project', typeController.create)
router.get('/get_all_project', typeController.getAll)
router.post('/add_user_in_project', typeController.add_user)
router.post('/add_rate_in_project', typeController.createRate)

router.get('/getUserProjects', typeController.getUserProjects)
router.get('/getUserTasks', tasksController.getUserTasks)


module.exports = router