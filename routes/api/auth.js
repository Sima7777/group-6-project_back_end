const express = require('express')

const { joiUserSchema } = require('../../models')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiUserSchema), controllerWrapper(ctrl.signup))

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))

router.post('/verify', controllerWrapper(ctrl.repeatEmailVerification))

router.post('/login', validation(joiUserSchema), controllerWrapper(ctrl.login))

router.post('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

module.exports = router
