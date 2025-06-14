const express = require('express');
const { addItem } = require('../controller/createController');
const createRoute = express.Router();

createRoute.post('/', addItem)

exports.createRoute = createRoute;