const express = require('express');

const homeRoute = express.Router();

const name = " Abhay";

homeRoute.get('/', (req, res, next) => {
  res.render("home", { name: name });
});

exports.homeRoute = homeRoute;