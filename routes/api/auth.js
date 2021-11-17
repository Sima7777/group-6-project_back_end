const express = require('express')
const { joiUserSchema } = require('../../models/user')
const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares')
const authController = require('../../controllers/auth')

const router = express.Router()

router.post('/signup', validation(joiUserSchema), controllerWrapper(authController.signup))

router.get('/verify/:verifyToken', controllerWrapper(authController.verify))

router.post('/resendVerification', controllerWrapper(authController.resendVerification))

router.post('/login', validation(joiUserSchema), controllerWrapper(authController.login))

router.get('/current', authenticate, controllerWrapper(authController.current))

router.patch('/currentBalance', authenticate, controllerWrapper(authController.currentBalance))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(authController.avatars))

router.post('/logout', authenticate, controllerWrapper(authController.logout))

router.get('/google', controllerWrapper(authController.googleAuth))

router.get('/google-redirect', controllerWrapper(authController.googleRedirect))

router.get('/:userEmail', controllerWrapper(authController.googleUser))

router.patch('/balance', authenticate, controllerWrapper(authController.setBalance))

module.exports = router
