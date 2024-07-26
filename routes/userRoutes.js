const express = require('express');
const routes = express.Router()
const userController = require('../controllers/userController')


// signup
routes.post('/signup', userController.signupUser)

// login
routes.post('/login', userController.loginUser)

module.exports = routes