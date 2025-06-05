const express = require('express');
const favouriteController = require('../controller/favouriteController');

const favouriteRoute = express.Router();

favouriteRoute.get('/fav', favouriteController.getFav);

favouriteRoute.post('/fav', favouriteController.postFav);

favouriteRoute.post('/favDelete', favouriteController.postFavDelete);

exports.favouriteRoute = favouriteRoute; 