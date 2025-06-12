const express = require('express');
const hostRoute = express.Router();

const hostController = require('../controller/hostController');

hostRoute.get('/host/editHome', hostController.getHome)
hostRoute.post("/host/editHome", hostController.postEditHome)
hostRoute.post("/host/editHomeSuccess", hostController.postEditHomeSuccess)
hostRoute.post("/host/deleteHome", hostController.postDeleteHome)


exports.hostRoute = hostRoute;