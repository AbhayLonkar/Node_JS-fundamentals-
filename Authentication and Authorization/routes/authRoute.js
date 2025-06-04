const express = require('express');


const authRoute = express.Router();

const authController = require('../controller/authController');

authRoute.get('/login', authController.getLogin);
authRoute.post('/login', authController.postLogin);
authRoute.get('/logout', authController.logout);
authRoute.get('/signup', authController.signup);
authRoute.post('/signup', authController.postSignup);

exports.authRoute = authRoute;