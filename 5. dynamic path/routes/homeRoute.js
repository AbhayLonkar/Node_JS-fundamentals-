const express = require('express');
const homeControler = require('../controller/homeController');

const homeRoute = express.Router();

homeRoute.get('/', homeControler.initalReq);

homeRoute.get('/add-home', homeControler.getAddHome);

homeRoute.post('/add-home', homeControler.postAddHome);

homeRoute.get('/home/:homeId', homeControler.getHome);


exports.homeRoute = homeRoute; 