const express = require('express');


const authRoute = express.Router();

const authController = require('../controller/authController');

authRoute.get('/login', authController.getLogin);
authRoute.post('/login', authController.postLogin);
authRoute.get('/logout', authController.logout);

exports.authRoute = authRoute;