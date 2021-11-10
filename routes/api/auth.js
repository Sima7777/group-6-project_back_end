const express = require('express')
const { joiUserSchema } = require('../../models/user')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const authController = require('../../controllers/auth')

const router = express.Router()

router.post('/signup', validation(joiUserSchema), controllerWrapper(authController.signup))

router.get('/verify/:verifyToken', controllerWrapper(authController.verify))

router.post('/resendVerification', controllerWrapper(authController.resendVerification))

router.post('/login', validation(joiUserSchema), controllerWrapper(authController.login))

router.get('/current', authenticate, controllerWrapper(authController.current))

router.post('/logout', authenticate, controllerWrapper(authController.logout))

router.patch('/setBalance', authenticate, controllerWrapper(authController.setBalance))

module.exports = router
