const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/change_role', checkRole('ADMIN'),userController.change_role)
router.post('/change_inf_user', checkRole('ADMIN'), userController.change_inf_user)
router.post('/del_user', checkRole('ADMIN'), userController.del_user)


module.exports = router
